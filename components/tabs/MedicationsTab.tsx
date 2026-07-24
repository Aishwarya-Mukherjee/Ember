import React, { useState, useRef, useEffect } from "react";
import { Pill, Camera, Plus, Loader2, X, AlertCircle, Check } from "lucide-react";
import { AppData } from "@/lib/types";

export function MedicationsTab({ patientData, onUpdate }: { patientData: AppData, onUpdate?: () => void }) {
  const medications = patientData?.medications || [];
  
  const [showForm, setShowForm] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  
  // Camera Modal States
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Stop camera stream cleanly
  const stopCamera = (currentStream = stream) => {
    if (currentStream) {
      currentStream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  // Cleanup on unmount or when modal closes
  useEffect(() => {
    if (!isCameraOpen) {
      stopCamera();
    }
    return () => stopCamera();
  }, [isCameraOpen]);

  // Handle attaching stream to video element
  useEffect(() => {
    if (videoRef.current && stream && !capturedPhoto) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, capturedPhoto]);

  const startCamera = async () => {
    setCameraError("");
    setCapturedPhoto(null);
    setIsCameraOpen(true);
    
    try {
      let newStream: MediaStream;
      try {
        newStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      } catch (err: any) {
        // Fallback for devices without environment camera (like desktop)
        if (err.name === 'OverconstrainedError' || err.name === 'NotFoundError') {
          newStream = await navigator.mediaDevices.getUserMedia({ video: true });
        } else {
          throw err;
        }
      }
      setStream(newStream);
    } catch (err: any) {
      console.error("Camera error:", err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraError("Camera access is needed to scan medications. Please allow access in your browser settings.");
      } else {
        setCameraError("Unable to access the camera. Your device might not support this feature.");
      }
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        // Extract as JPEG base64
        const photoDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedPhoto(photoDataUrl);
        // Stop stream immediately to turn off camera light
        stopCamera();
      }
    }
  };

  const retakePhoto = () => {
    setCapturedPhoto(null);
    startCamera();
  };

  const processPhoto = async () => {
    if (!capturedPhoto) return;
    setIsScanning(true);
    
    try {
      // Remove the data:image/jpeg;base64, prefix
      const base64Data = capturedPhoto.split(',')[1];
      
      const res = await fetch('/api/medications/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: base64Data, mimeType: 'image/jpeg' })
      });
      
      if (!res.ok) throw new Error("Failed to scan medication");
      const data = await res.json();
      
      if (data.name) setName(data.name);
      if (data.dosage) setDosage(data.dosage);
      if (data.frequency) setFrequency(data.frequency);
      
      setIsCameraOpen(false); // Close camera modal
    } catch (e: any) {
      console.error(e);
      setCameraError("Failed to extract details from image. Try capturing again.");
    } finally {
      setIsScanning(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/medications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientId: patientData.id,
          name,
          dosage,
          frequency
        })
      });
      if (res.ok) {
        setShowForm(false);
        setName(""); setDosage(""); setFrequency("");
        if (onUpdate) onUpdate();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto space-y-6">
      
      {/* CAMERA MODAL */}
      {isCameraOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/90 flex flex-col items-center justify-center p-4 sm:p-8 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col relative">
            
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white z-10">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Camera className="w-5 h-5 text-cyan-600" />
                Scan Medication
              </h3>
              <button 
                onClick={() => setIsCameraOpen(false)}
                className="p-2 bg-slate-100 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors"
                disabled={isScanning}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 min-h-[300px] sm:min-h-[400px] bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden">
              
              {cameraError ? (
                <div className="p-8 text-center max-w-md mx-auto">
                  <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
                  <p className="text-white font-medium mb-6">{cameraError}</p>
                  <button 
                    onClick={() => setIsCameraOpen(false)}
                    className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-bold transition-colors"
                  >
                    Enter Manually
                  </button>
                </div>
              ) : capturedPhoto ? (
                <div className="w-full h-full relative flex items-center justify-center bg-black">
                  <img src={capturedPhoto} alt="Captured" className="w-full h-full object-contain" />
                  {isScanning && (
                    <div className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center backdrop-blur-sm">
                      <Loader2 className="w-10 h-10 text-cyan-400 animate-spin mb-4" />
                      <p className="text-white font-bold text-lg animate-pulse">Extracting Details...</p>
                    </div>
                  )}
                </div>
              ) : (
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className="w-full h-full object-cover"
                />
              )}
              
              <canvas ref={canvasRef} className="hidden" />
              
              {/* Camera Guide Overlay */}
              {!cameraError && !capturedPhoto && (
                <div className="absolute inset-0 pointer-events-none border-[40px] sm:border-[80px] border-black/40">
                  <div className="w-full h-full border-2 border-dashed border-white/50 rounded-2xl"></div>
                </div>
              )}
            </div>
            
            {!cameraError && (
              <div className="px-6 py-6 bg-white border-t border-slate-100 flex flex-col sm:flex-row gap-3 justify-center items-center z-10">
                {!capturedPhoto ? (
                  <button 
                    onClick={capturePhoto}
                    className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-700 text-white px-10 py-3.5 rounded-xl font-bold shadow-md shadow-cyan-600/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                    </div>
                    Capture Label
                  </button>
                ) : (
                  <>
                    <button 
                      onClick={retakePhoto}
                      disabled={isScanning}
                      className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 px-8 py-3.5 rounded-xl font-bold transition-colors disabled:opacity-50"
                    >
                      Retake
                    </button>
                    <button 
                      onClick={processPhoto}
                      disabled={isScanning}
                      className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3.5 rounded-xl font-bold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <Check className="w-5 h-5" />
                      Use this photo
                    </button>
                  </>
                )}
              </div>
            )}
            
          </div>
        </div>
      )}

      {/* MAIN TAB CONTENT */}
      <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <Pill className="w-6 h-6 text-cyan-600" />
            Active Medications
          </h2>
          {!showForm && (
            <button 
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl font-bold text-sm transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Medication
            </button>
          )}
        </div>
        
        {showForm && (
          <div className="mb-8 p-6 bg-slate-50 border border-slate-200 rounded-2xl relative">
            <button 
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 p-2 bg-white rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors shadow-sm"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-lg font-bold text-slate-800 mb-4">Add New Medication</h3>
            
            <div className="mb-6 flex flex-col sm:flex-row gap-3">
              <button 
                type="button"
                onClick={startCamera}
                className="flex items-center justify-center gap-2 bg-cyan-100 hover:bg-cyan-200 text-cyan-800 px-6 py-3 rounded-xl font-bold text-sm transition-colors border border-cyan-200 shadow-sm"
              >
                <Camera className="w-5 h-5" />
                Scan Medication Label
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-700">Medication Name</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Lisinopril"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-700">Dosage</label>
                  <input 
                    type="text" 
                    value={dosage} 
                    onChange={e => setDosage(e.target.value)}
                    placeholder="e.g. 10mg"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-bold text-slate-700">Frequency</label>
                  <input 
                    type="text" 
                    value={frequency} 
                    onChange={e => setFrequency(e.target.value)}
                    placeholder="e.g. Take 1 tablet daily"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button 
                  type="submit"
                  disabled={isSubmitting || !name.trim()}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : "Save Medication"}
                </button>
              </div>
            </form>
          </div>
        )}

        {medications.length === 0 ? (
          <p className="text-slate-500 font-medium text-center py-12">No active medications.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {medications.map((med: any) => (
              <div key={med.id} className="p-5 border border-slate-100 rounded-2xl bg-slate-50 flex items-start gap-4 hover:border-cyan-200 transition-colors">
                <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center shrink-0 mt-1">
                  <Pill className="w-6 h-6 text-cyan-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-800 text-lg flex justify-between items-start">
                    {med.name}
                    {med.dosage && <span className="text-sm font-bold text-cyan-700 bg-cyan-100 px-2 py-0.5 rounded-lg">{med.dosage}</span>}
                  </h4>
                  {med.frequency && <p className="text-sm text-slate-600 font-medium mt-1">{med.frequency}</p>}
                  <p className="text-xs text-slate-400 mt-2">Prescribed: {med.createdAt ? new Date(med.createdAt).toLocaleDateString() : 'Unknown'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
