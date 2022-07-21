// import axios from 'axios';
// import React from 'react';
 
// export default SearchState = (state) => {

//   const handleFetch = async () => {
//     let stateResponse = await axios.put('/api/hikes/states', {state:state.value}, { proxy:{ host: 'localhost', port: 3000}});
//     console.log(stateResponse);
//   }

//   return (
//     <div>
//       <select name="state" id="state">
//         <option value="New York">New York</option>
//         <option value="Alabama">Alabama</option>
//         <option value="Alaska">Alaska</option>
//         <option value="Arizona">Arizona</option>
//         <option value="Arkansas">Arkansas</option>
//         <option value="California">California</option>
//         <option value="Colorado">Colorado</option>
//         <option value="Connecticut">Connecticut</option>
//         <option value="Delaware">Delaware</option>
//         <option value="Florida">Florida</option>
//         <option value="Georgia">Georgia</option>
//         <option value="Hawaii">Hawaii</option>
//         <option value="Idaho">Idaho</option>
//         <option value="Illinois">Illinois</option>
//         <option value="Indiana">Indiana</option>
//         <option value="Iowa">Iowa</option>
//         <option value="Kansas">Kansas</option>
//         <option value="Kentucky">Kentucky</option>
//         <option value="Louisiana">Louisiana</option>
//         <option value="Maine">Maine</option>
//         <option value="Maryland">Maryland</option>
//         <option value="Michigan">Michigan</option>
//         <option value="Minnesota">Minnesota</option>
//         <option value="Mississippi">Mississippi</option>
//         <option value="Missouri">Missouri</option>
//         <option value="Massachusetts">Massachusetts</option>
//         <option value="Montana">Montana</option>
//         <option value="Nebraska">Nebraska</option>
//         <option value="Nevada">Nevada</option>
//         <option value="New Hampshire">New Hampshire</option>
//         <option value="New Jersey">New Jersey</option>
//         <option value="New Mexico">New Mexico</option>
//         <option value="North Carolina">North Carolina</option>
//         <option value="North Dakota">North Dakota</option>
//         <option value="Ohio">Ohio</option>
//         <option value="Oklahoma">Oklahoma</option>
//         <option value="Oregon">Oregon</option>
//         <option value="Pennsylvania">Pennsylvania</option>
//         <option value="Rhode Island">Rhode Island</option>
//         <option value="South Carolina">South Carolina</option>
//         <option value="South Dakota">South Dakota</option>
//         <option value="Tennessee">Tennessee</option>
//         <option value="Texas">Texas</option>
//         <option value="Utah">Utah</option>
//         <option value="Vermont">Vermont</option>
//         <option value="Virginia">Virginia</option>
//         <option value="Washington">Washington</option>
//         <option value="Wisconsin">Wisconsin</option>
//         <option value="Wyoming">Wyoming</option>
//   </select>
//   <button className='searchForState' onClick={()=> handleFetch(state.value)}></button>
//     </div>

//   )
//  }
 
//  hikeController.getState = async (req, res, next) => {
//   try {
//     const result = await Hike.find({ state: req.body.state }); //get hikes of the current logged in user
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