import axios from "axios";
import { HOST } from "../../utils/data";

const DataDeletionPage = () => {
    const handleDeleteData = async () => {
        try {
            const response = await axios.post(`${HOST}/api/users/facebook_data_deletion`, {
                signed_request: 'signed_request_from_facebook'
            });

            if (response.data && response.data.confirmation_code) {
                console.log('Data deletion requested successfully.');
            }
        } catch (error) {
            console.error('Error requesting data deletion:', error);
        }
    };

    return (
        <button onClick={handleDeleteData}>Delete My Data</button>
    );
}

export default DataDeletionPage;