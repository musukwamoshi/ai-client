import { FunctionComponent } from 'react';

interface Props {
    to: { pathname: string; search?: string }
}

export const FullRedirect: FunctionComponent<Props> = (props) => {
    const {
        to: { pathname, search = '' },
    } = props;

    window.location.replace(`${pathname}${search}`);
    return null;
};
