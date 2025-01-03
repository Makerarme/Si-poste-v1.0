import { defineStore } from 'pinia';

export const useFormStore = defineStore('form', {
    state: () => ({
        form: {
            collaborator: { firstName: '', lastName: '' },
            gender: 'Féminin',
            referent: { firstName: '', lastName: '' },
            requestType: 'Restitution de matériel',
            requestDate: '2025-01-01',
            materialState: 'Très bon état',
            materials: [],
        },
    }),
    actions: {
        updateForm(newData) {
            this.form = { ...this.form, ...newData };
        },
        resetForm() {
            this.form = {
                collaborator: { firstName: '', lastName: '' },
                gender: 'Féminin',
                referent: { firstName: '', lastName: '' },
                requestType: 'Restitution de matériel',
                requestDate: '2025-01-01',
                materialState: 'Très bon état',
                materials: [],
            };
        },
    },
});
