import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Slide, { SlideProps } from '@mui/material/Slide';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import { SnackBarOpen } from '../../../../services/Reducers/UserReducer';

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionLeft(props: TransitionProps) {
    return <Slide {...props} direction="left" />;
}

function TransitionUp(props: TransitionProps) {
    return <Slide {...props} direction="up" />;
}

function TransitionRight(props: TransitionProps) {
    return <Slide {...props} direction="right" />;
}

function TransitionDown(props: TransitionProps) {
    return <Slide {...props} direction="down" />;
}

export default function DirectionSnackbar() {
    const isSuccessOpen = useSelector((state: any) => state.user.value.isSnackBarOpen)
    const snackMessage = useSelector((state: any) => state.userData.value.snackBarMessage)
    const dispatch = useDispatch()
    const [transition, setTransition] = React.useState<
        React.ComponentType<TransitionProps> | undefined
    >(undefined);

    const handleClose = () => {
     dispatch(SnackBarOpen(false))
    };

    return (
        <div>
            <Snackbar
                open={isSuccessOpen}
                onClose={handleClose}
                TransitionComponent={transition}
                key={transition ? transition.name : ''}
            >
                <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                    {snackMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}
