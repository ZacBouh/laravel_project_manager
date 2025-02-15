import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from '@inertiajs/react';
import CreateProjectForm from "./Partials/CreateProjectForm";
import ContentContainer from "@/Layouts/ContentContainer"
import ContentCard from "@/Components/ContentCard";
import { User , PageProps} from "@/types";

export default function Index({auth} : PageProps) {

    const user = auth.user

    return <AuthenticatedLayout
        header={
            <>
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Projets
                </h2>
                {console.log(user)}
                {user.permissions.includes('view_project') && <>
                    <SecondaryButton>
                    ➕ Nouveau projet
                    </SecondaryButton>
                </>}
            </>
        }
    >
        <Head title="Projects" />

        <ContentContainer>
            <ContentCard>
                <CreateProjectForm user={null} />
            </ContentCard>
        </ContentContainer>

    </AuthenticatedLayout>
}
