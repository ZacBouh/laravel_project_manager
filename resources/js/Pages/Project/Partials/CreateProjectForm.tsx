import {DropdownOption} from '@/Components/Dropdown';
import DropdownOptionSelect from '@/Components/DropDownOptionSelect';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { User } from '@/types';
import SecondaryButton from '@/Components/SecondaryButton';

export default function CreateProjectForm({user} : {
    user : User | null
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        owner_id: '',
        status: '',
        client_id: user?.id.toString() ?? '',
    });

    const handleSelectedClient = (e : React.MouseEvent) => setData('client_id', e.currentTarget.id)
    const handleSelectedStatus = (e : React.MouseEvent) => setData('status', e.currentTarget.id)
    const handleSelectedOwner = (e : React.MouseEvent) => setData('owner_id', e.currentTarget.id)
    const handleReset = (e : React.MouseEvent) => reset()


    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            // onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const clientsOptions : DropdownOption[] = [
        {id: 'id1', label : 'Client 1'}
    ]

    const ownersOptions : DropdownOption[] = [
        {id: 'id1', label : 'Owner 1'}
    ]

    const statusOptions : DropdownOption[] = [
        {id: 'en attente', label: 'EN ATTENTE'}
    ]

    return (

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="Titre" value="Titre" />

                    <TextInput
                        id="title"
                        name="title"
                        value={data.title}
                        className="mt-1 block w-full"
                        autoComplete="title"
                        onChange={(e) => setData('title', e.target.value)}
                        required
                    />

                    <InputError message={errors.title} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="description" value="Description" />

                    <textarea
                        name="description"
                        id="description"
                        value={data.description}
                        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 mt-1 block w-full "
                        autoComplete='description'
                        onChange={(e) => setData('description', e.target.value)}
                        style={{resize: 'none'}}
                        rows={4}
                    ></textarea>
                    <InputError message={errors.description} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor='client_id' value="Client" />
                    <DropdownOptionSelect
                        contentAlign='left'
                        id='client_id'
                        defaultOption='Choisir'
                        selectCallback={handleSelectedClient}
                        selectedOptionId={data.client_id}
                        options={clientsOptions}
                    />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="status" value="Status" />
                    <DropdownOptionSelect
                        contentAlign='left'
                        id='status'
                        defaultOption='Choisir'
                        selectCallback={handleSelectedStatus}
                        selectedOptionId={data.status}
                        options={statusOptions}
                    />
                </div>

                {!user && <>
                    <div className="mt-4">
                        <InputLabel htmlFor="owner" value="Résponsable du Projet" />
                        <DropdownOptionSelect
                            contentAlign='left'
                            id='owner'
                            defaultOption='Choisir'
                            selectCallback={handleSelectedOwner}
                            selectedOptionId={data.owner_id}
                            options={ownersOptions}
                        />
                    </div>
                </>}

                <div className="mt-4 flex items-center justify-end">
                    <SecondaryButton className="ms-4" type='button' disabled={processing} onClick={handleReset}>
                        Vider le formulaire
                    </SecondaryButton>
                    <PrimaryButton className="ms-4" type='submit' disabled={processing}>
                        Enregistrer le projet
                    </PrimaryButton>
                </div>
            </form>
    );
}
