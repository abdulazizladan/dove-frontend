import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Patient } from '../models/patient.model';

export interface PatientState {
    patients: Patient[];
    selectedPatient: Patient | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: PatientState = {
    patients: [],
    selectedPatient: null,
    isLoading: false,
    error: null
};

export const PatientStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => ({
        setPatients(patients: Patient[]) {
            patchState(store, { patients, isLoading: false, error: null });
        },
        addPatient(patient: Patient) {
            patchState(store, (state) => ({ patients: [...state.patients, patient], isLoading: false }));
        },
        updatePatient(updatedPatient: Patient) {
            patchState(store, (state) => ({
                patients: state.patients.map(p => p.id === updatedPatient.id ? updatedPatient : p),
                isLoading: false
            }));
        },
        deletePatient(id: string) {
            patchState(store, (state) => ({
                patients: state.patients.filter(p => p.id !== id),
                isLoading: false
            }));
        },
        setLoading(isLoading: boolean) {
            patchState(store, { isLoading });
        },
        setError(error: string) {
            patchState(store, { error, isLoading: false });
        }
    }))
);
