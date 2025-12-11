import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { TestRequest } from '../models/test-request.model';

export interface RequestState {
    requests: TestRequest[];
    isLoading: boolean;
    error: string | null;
}

const initialState: RequestState = {
    requests: [],
    isLoading: false,
    error: null
};

export const RequestStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => ({
        setRequests(requests: TestRequest[]) {
            patchState(store, { requests, isLoading: false, error: null });
        },
        addRequest(request: TestRequest) {
            patchState(store, (state) => ({ requests: [request, ...state.requests], isLoading: false }));
        },
        updateRequest(updatedRequest: TestRequest) {
            patchState(store, (state) => ({
                requests: state.requests.map(r => r.id === updatedRequest.id ? updatedRequest : r),
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
