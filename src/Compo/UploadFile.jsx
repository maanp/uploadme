import React from 'react';

export const UploadFile = () => {

    

    return <div>
        <List >
            <ListItem >
                <ListItemAvatar>
                    <Avatar>
                        <FolderIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={
                    <Typography component={'span'}>{d.name} - <Typography component={'span'} sx={{ color: `green` }}> {showloading ? 'Uploading...' : 'Uploaded'}</Typography></Typography>} />
            </ListItem>
        </List>
        <Container >
            <Grid container justifyContent="space-between" alignItems="center">
                <LinearProgress variant="determinate" value={progressEach[i]} sx={{ width: 80 + '%' }} />
                <Typography>{progressEach[i]}%</Typography>
            </Grid>
        </Container>

    </div>;
};
