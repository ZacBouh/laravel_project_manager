import {DropdownOption} from '@/Components/Dropdown';
import DropdownOptionSelect from '@/Components/DropDownOptionSelect';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { router, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useEffect, useMemo, useState } from 'react';
import { PageProps, User } from '@/types';
import SecondaryButton from '@/Components/SecondaryButton';
import {useClients} from '@/Hooks'

export default function CreateProjectForm({user} : {
    user : User | null
}) {

    const { flash } = usePage<PageProps<{flash: {message: string}}>>().props

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        owner_id: '',
        status: 'en attente',
        client_id: user?.id.toString() ?? '',
    });

    const handleSelectedClient = (e : React.MouseEvent) => setData('client_id', e.currentTarget.id)
    const handleSelectedStatus = (e : React.MouseEvent) => setData('status', e.currentTarget.id)
    const handleSelectedOwner = (e : React.MouseEvent) => setData('owner_id', e.currentTarget.id)
    const handleReset = (e : React.MouseEvent) => reset()

    console.log(errors)

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('project.store'), {
            // onFinish: () => reset(),
        });
    };

    const { clients, error : clientsError, loading : clientsLoading } = useClients(user?.id);

    const clientsOptions : DropdownOption[] = clients.map((client) => {
        return {id: client.id.toString(), label: client.name}
    })

    const ownersOptions : DropdownOption[] = clients.map((client) => {
        return {id: client.id.toString(), label: client.name}
    })

    const statusOptions : DropdownOption[] = [
        {id: 'en attente', label: 'En attente'},
        {id: 'à venir', label: 'À venir'},
        {id: 'terminé', label: 'Terminé'},
        {id: 'annulé', label: 'Annulé'},
    ]

    return (

            <form onSubmit={submit}>
                {flash?.message && <>
                    <div>
                        <h1>{flash.message}</h1>
                    </div>
                </> }
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
                    <InputError message={errors.client_id} className="mt-2" />
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
                    <InputError message={errors.status} className="mt-2" />
                </div>

                {user?.permissions.includes('set_project_owner') && <>
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
                        <InputError message={errors.owner_id} className="mt-2" />
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
