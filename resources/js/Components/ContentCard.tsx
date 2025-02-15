import { PropsWithChildren, ReactNode} from 'react';

export default function Authenticated({
    children,
}: PropsWithChildren) {
    return (
        <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8" >
            {children}
        </div>
    );
}
