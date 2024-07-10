import { ReactNode, Suspense } from 'react';

import useClientState from "../hooks/use-client"

type Props = {
    fallback?: ReactNode,
    children: ReactNode
}

export const SuspenseHelper: React.FC<Props> = ({fallback, children}) => {

    return (
        <Suspense fallback={fallback}>
            {!useClientState() ? fallback : children}
        </Suspense>
    )
};