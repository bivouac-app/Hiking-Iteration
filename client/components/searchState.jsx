import axios from 'axios';
import React,{useState} from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Select from '@mui/material/Select';
 
const SearchState = () => {
  const [stateShown, setStateShown] = useState('')
  const [state, changeState] = useState([])

  const handleFetch = async () => {
    console.log('preFetch')
    // let stateResponse = await axios.put('/api/hikes/states', {state:state.value}, { proxy:{ host: 'localhost', port: 3000}});
    // console.log(stateResponse);
  };

  const handleChange = (event) => {
    const {target: { value }} = event;
    changeState([value]);
    console.log(value)
    try {
      handleFetch([value]);
    } catch (e) {
      console.log(e);
    }
  };

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <div>
  <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={state}
          onChange={handleChange}
          input={<OutlinedInput label="State" />}
          MenuProps={MenuProps}
        >
          {states.map((state) => (
            <MenuItem
              key={state}
              value={state}
              // style={getStyles(name, personName, theme)}
            >
              {state}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  <button className='searchForState' onClick={()=> handleFetch(state.value)}></button>
  <div className='modalContainerForSearch'>

  </div>
    </div>

  )
 }
 
 export default SearchState
//  hikeController.getState = async (req, res, next) => {
//   try {
//     const result = await Hike.find({ state: req.body.state },{location : 1, difficulty:1, distance:1, crowds:1, type:1, user_id: 0}); //get hikes of the current logged in user
//     // if (!result.length) throw 'Could not get all hikes';
//     if(result === {}) alert('There are currently no trails listing in our database for this state')
//     res.locals.allHikesinAState = result;
//     return next();
//   } catch (error) {
//     return next({
//       log: 'Could all hikes in hikeController.getAllHikes' + error,
//       status: 400,
//       message: { err: 'error in getting all states' },
//     });
//   }
// };


// router.post('/states', hikeController.getState, (req, res) => {
//   return res.status(200).json(res.locals.allHikesinAState);
// });


// <DataGrid
//   rows={rows}
//   columns={columns}
//   pageSize={5}
//   rowsPerPageOptions={[5]}
//   checkboxSelection
// />