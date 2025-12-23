import React from "react";
import { Detail } from "../../features/post/components/Detail";

export const Post: React.FC<{ cuuid: string }> = ({
    cuuid
}) => {
    return (
        <>
            <Detail cuuid={cuuid} />
        </>
    );
}