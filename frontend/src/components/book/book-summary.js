import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function BookSummary(props) {
    const {
        summary,
    } = props;

    return (
        <Box sx={{ width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.06)' }}>
            <Typography variant="subtitle2" sx={{ padding: '10px 20px 10px 20px' }}>
                Summary
            </Typography>
            <Box sx={{ maxHeight: '100px', overflow: 'auto', padding: '0 20px 20px 20px' }}>
                {summary.split('\n').map((para) => (
                    <Box sx={{ marginTop: '10px' }}>
                        <Typography variant="caption">
                            {para}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}