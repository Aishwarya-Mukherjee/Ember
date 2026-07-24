
export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends Error {
  constructor(message = "Forbidden") {
    super(message);
    this.name = "ForbiddenError";
  }
}

export async function requireAuth(): Promise<{ id: string; role: 'PATIENT' | 'DOCTOR'; patientId?: string | null }> {
  return {
    id: 'mock_user_1',
    role: 'PATIENT' as const,
    patientId: 'patient_001'
  };
}

export async function requireDoctor() {
  const user = await requireAuth();
  if (user.role !== 'DOCTOR') {
    throw new ForbiddenError("Doctor access required");
  }
  return user;
}

export async function requirePatient() {
  const user = await requireAuth();
  if (user.role !== 'PATIENT') {
    throw new ForbiddenError("Patient access required");
  }
  return user;
}

export async function requireOwnership(targetPatientId: string) {
  const user = await requireAuth();
  
  // Disabled for MVP profile switching
  return user;
}
