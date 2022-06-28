import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import RemoveIcon from '@mui/icons-material/Remove';

const icon = (value) => {
    if (value > 0) {
        return <ExpandLessIcon color="success" fontSize="large" />;
    } else if (value === 0) {
        return <RemoveIcon color="warning" fontSize="large" />;
    }

    return <ExpandMoreIcon color="error" fontSize="large" />;
};

export default icon;
