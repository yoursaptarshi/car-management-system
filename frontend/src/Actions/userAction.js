import axios from 'axios'
const backendURL = 'http://127.0.0.1:5000'
export const userLogin = ({UserName,Password})=>async(dispatch)=>{
    try {
        dispatch({type:'Login_Request'});

        const  response  = await axios.post(
            `${backendURL}/api/v1/login`,
            { email:UserName, password:Password },
            {
              withCredentials: true,
              headers:{
                'Content-Type':"application/json"
              }
            }
          );
          const data = response.data;
        console.log(response);
        dispatch({
            type:'Login_Success',
            payload:data
        })

    } catch (error) {
        dispatch({
            type: 'Login_Failure',
            payload: error.response.data.errorMessage,
          });
    }
}

export const userRegister = ({Name,UserName,Password}) => async(dispatch)=>{
    try {
        dispatch({type:'Register_Request'})

        const {data} = await axios.post(`${backendURL}/api/v1/register`,{name:Name,email:UserName,password:Password},
            {
              withCredentials: true, 
            })

        dispatch({
            type:'Register_Success',
            payload:data
        })
    } catch (error) {
        dispatch({
            type:'Register_Failure',
            payload:error.response.data.errorMessage
        })
    }
}

export const userProfile = ()=> async(dispatch)=>{
    try {
        dispatch({type:'User_Fetch_Request'})

        const {data} = await axios.get(`${backendURL}/api/v1/me`,
            {
              withCredentials: true, 
            })
            dispatch({
                type:'User_Fetch_Success',
                payload:data
            })
    } catch (error) {
        dispatch({
            type:'User_Fetch_Failure',
            payload:error.response.data.errorMessage
        })
    }
}

export const clearErrors = ()=>async(dispatch)=>{
    dispatch({type:'CLEAR_ERRORS'});
  }