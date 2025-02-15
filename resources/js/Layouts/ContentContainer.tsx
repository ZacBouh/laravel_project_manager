import { PropsWithChildren, ReactNode} from 'react';

export default function Authenticated({
    children,
}: PropsWithChildren) {
    return (
        <div className="py-12" >
            <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8" >
                {children}
            </div>
        </div>
    );
}
