import axios from "axios";

const BASE_URL = "http://localhost:3001"; //https://medicine-app-back.herokuapp.com

//user Validated
export function userValidated(payload) {
  return {
    type: "USER_VALIDATED",
    payload,
  };
}

//get all ads
export function getAds() {
  return async function (dispatch) {
    var json = await axios.get(`${BASE_URL}/anuncios`);

    return dispatch({ type: "GET_ADS", payload: json.data });
  };
}

// get professional by ID
export function getProfessionalById(id) {
  return async function (dispatch) {
    var json = await axios.get(`${BASE_URL}/professionals/${id}`);

    return dispatch({ type: "GET_PROFESSIONAL_DETAILS", payload: json.data });
  };
}

// Create a  USER
export function postUser(payload) {
  //console.log('postUser=>',payload)
  return async function (dispatch) {
    try {
      var json = await axios.post(`${BASE_URL}/users`, payload);
      //console.log('postUser Respuesta=>',json)
      return json;
    } catch (error) {
      console.log(error);
    }
  };
}

//Create a Professional
export function postProfessional(payload) {
  //console.log('postProf=>',payload);
  return async function (dispatch) {
    try {
      var json = await axios.post(`${BASE_URL}/professionals`, payload);
      //console.log('postProf respuesta=>',json)
      return json;
    } catch (error) {
      console.log(error);
    }
  };
}

//clear Detail object
export function cleanDetail() {
  return {
    type: "CLEAN_DETAIL",
  };
}

//Get all Users
export function getUsers() {
  return async function (dispatch) {
    var json = await axios.get(`${BASE_URL}/users`);
    return dispatch({ type: "GET_USERS", payload: json.data });
  };
}

//get user by id
export function getUsersById(id) {
 // console.log('id=>', id)
  return async function (dispatch) {
    var json = await axios.get(`${BASE_URL}/user/${id}`);
    return dispatch({ type: "GET_USER_DETAIL", payload: json.data });
  };
}

//get add by ID
export function getAdById(id) {
  
  return async function (dispatch) {
    var json = await axios.get(`${BASE_URL}/ad/${id}`);
    return dispatch({ type: "GET_AD_DETAILS", payload: json.data });
  };
}

// filters
export function filterAllAds({
  specialty,
  country,
  province,
  city,
  typeService,
}) {
  return async function (dispatch) {
    var json = await axios.get(
      `${BASE_URL}/filter?typeService=${typeService}&specialty=${specialty}&country=${country}&province=${province}&city=${city}`
    );
    return dispatch({ type: "FILTER_ALL_ADS", payload: json.data });
  };
}

//order by price
export function orderByPrice(payload) {
  return {
    type: "ORDER_PRICE",
    payload,
  };
}

//order by ranking
export function orderByRanking(payload) {
  return {
    type: "ORDER_RANKING",
    payload,
  };
}

//Create Ad
export function postAdd(payload) {
  return async function (dispatch) {
    try {
      var json = await axios.post(`${BASE_URL}/ad`, payload);
      return json;
    } catch (error) {
      console.log(error);
    }
  };
}

//get professional by name
export function getName(name) {
  return async (dispatch) => {
    try {
      var json = await axios.get(`${BASE_URL}/ads?name=${name}`);
      return dispatch({ type: "GET_NAME", payload: json.data });
    } catch (error) {
      alert("no tenemos un profesional con ese nombre");
    }
  };
}

export function getComments() {
  return async (dispatch) => {
    try {
      
      var json = await axios.get(`${BASE_URL}/comments/all`);
      return dispatch({ type: "GET_COMMENTS", payload: json.data });
    } catch (err) {
      console.log(err);
    }
  };
}

//ad professional to favourites
export function addFavorite(payload) {
  return async function (dispatch) {
    try {
      var json = await axios.put(`${BASE_URL}/addFavorites`, payload);
      return json;
    } catch (error) {
      console.log(error);
    }
  };
}

//remove favourites
export function removeFavorite(payload) {
  return async function (dispatch) {
    try {
      var json = await axios.put(`${BASE_URL}/removeFavorites`, payload);
      return json;
    } catch (error) {
      console.log(error);
    }
  };
}

export function createMorningHours(payload) {
  return async function (dispatch) {
    try {
      var json = await axios.post(`${BASE_URL}/appointment/hours`, payload);
      return dispatch({
        type: "CREATE_MORNING_HOURS",
        payload: json.data,
      });
    } catch (error) {
      console.log("no recibo en action por este error==>", error);
    }
  };
}

export function createAfternoonHours(payload) {
  return async function (dispatch) {
    try {
      var json = await axios.post(`${BASE_URL}/appointment/hours`, payload);
      return dispatch({
        type: "CREATE_AFTERNOON_HOURS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// restore user by email and password
export function restoreUser(userRestore) {
  return async function (dispatch) {
    try {
      const dbResponse = await axios.put(`${BASE_URL}/restore`, userRestore);
      if (dbResponse) {
        return dispatch({
          type: "USER_RESTORE",
          payload: dbResponse.data,
        });
      }
    } catch (e) {
      return dispatch({
        type: "USER_RESTORE",
        payload: e.message,
      });
    }
  };
}

// soft delete user from Data Base.
export function deleteUserByID(userId) {
  return async function (dispatch) {
    try {
      const dbResponse = await axios.put(`${BASE_URL}/delete/${userId}`);

      return dispatch({
        type: "USER_DELETED",
        payload: dbResponse.data,
      });
    } catch (e) {
      if (e.response.data.message) {
        return dispatch({
          type: "ERROR",
          payload: {
            message: e.response.data.message,
          },
        });
      } else {
        return dispatch({
          type: "ERROR",
          payload: {
            message: e.message,
          },
        });
      }
    }
  };
}

export function putEditInfoAd(payload, idAd) {
  return async function (dispatch) {
    try {
      await axios.put(`${BASE_URL}/Ad/${idAd}`, payload);
    } catch (error) {
      console.log(error);
    }
  };
}

export function putEditInfoUser(payload, idUser) {
  return async function (dispatch) {
    try {
      await axios.put(`${BASE_URL}/user/${idUser}`, payload);
    } catch (error) {
      console.log(error);
    }
  };
}

export function putEditInfoProfessional(payload, idUser) {
  return async function (dispatch) {
    try {
      await axios.put(`${BASE_URL}/professional/${idUser}`, payload);
    } catch (error) {
      console.log(error);
    }
  };
}

export function putEditAppointment(payload, idApp) {
  return async function (dispatch) {
    try {
      console.log('idApp', idApp)
      console.log('payload', payload)
      await axios.put(`${BASE_URL}/appointments/edit/${idApp}`, payload);
    } catch (error) {
      console.log(error);
    }
  };
}

export function clearUserDetail() {
  return {
    type: "CLEAR_USER_DETAIL",
  };
}

export function getProfessionalApps(professionalMedicalLicense) {
  // console.log('llegue')
  return async (dispatch) => {
    try {
      var json = await axios.get(
        `${BASE_URL}/appointments/${professionalMedicalLicense}`
      );
      return dispatch({
        type: "GET_PROFESSIONAL_APPOINTMENTS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error, "error en action professional Appointment");
    }
  };
}

export function getUserApps(userEmail) {
  // console.log('llegue')
  return async (dispatch) => {
    try {
      var json = await axios.get(`${BASE_URL}/appointments/user/${userEmail}`);
      return dispatch({ type: "GET_USER_APPOINTMENTS", payload: json.data });
    } catch (error) {
      console.log(error, "error en action professional Appointment");
    }
  };
}

export function postAppointments(payload, reload) {
  console.log("llego reload, action", reload);
  return async function (dispatch) {
    try {
      var json = await axios.post(`${BASE_URL}/appointment`, payload);
      return dispatch({ type: "RELOAD", payload: reload });
    } catch (error) {
      console.log(error);
    }
  };
}

//get  countries, states and citys for input login
export function getCountries() {
  return async (dispatch) => {
    try {
      var json = await axios.get(`${BASE_URL}/countries`);
      return dispatch({ type: "GET_COUNTRIES", payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getStates(countryId) {
  return async (dispatch) => {
    try {
      var json = await axios.get(`${BASE_URL}/states/${countryId}`);
      return dispatch({ type: "GET_STATES", payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getCities(countryId, stateId) {
  return async (dispatch) => {
    try {
      var json = await axios.get(`${BASE_URL}/cities/${countryId}/${stateId}`);
      return dispatch({ type: "GET_CITIES", payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function selectedTime(payload) {
  return {
    type: "EVENT_SELECTED",
    payload,
  };
}

export function getAppointmentsByAdAvailable(adId) {
  return async (dispatch) => {
    try {
      var json = await axios.get(`${BASE_URL}/appointments/ad/${adId}`);
      return dispatch({ type: "GET_AVAILABLE_APPS", payload: json.data });
    } catch (error) {
      console.log(error, "error en action available ad");
    }
  };
}
export function deleteAppointment(idApp) {
  return async function (dispatch) {
    try {
      var json = await axios.delete(`${BASE_URL}/delete/appointment/${idApp}`);
      return dispatch({ type: "DELETED_APPOINTMENT", payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function createCancellAppointmentsByUser(idApp) {
  return async function (dispatch) {
    try {
      var json = await axios.post(`${BASE_URL}/appointment/cancelled/${idApp}`);
      return json;
    } catch (error) {
      console.log(error);
    }
  };
}

export function clearUserAppointments() {
  return {
    type: "CLEAR_USER_APPOINTMENTS",
  };
}

export function traemeTodo(medicalLicense) {
  return async (dispatch) => {
    try {
      var json = await axios.get(
        `${BASE_URL}/appointments/all/${medicalLicense}`
      );
      return dispatch({ type: "TRAEME_TODO", payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function clearAdDetails() {
  return {
    type: "CLEAR_AD_DETAILS",
  };
}

export function clearTodo() {
  return {
    type: "CLEAR_TODO",
  };
}

export function getUsersByAdminById(id) {
  return async function (dispatch) {
    var json = await axios.get(`${BASE_URL}/user/${id}`);
    return dispatch({ type: "GET_USERS_BY_ADMIN", payload: json.data });
  };
}

export function deleteByAdmin(userId) {
  return async function (dispatch) {
    await axios.put(`${BASE_URL}/Admindelete/${userId}`);
    return dispatch({
      type: "USER_DELETED_BY_ADMIN",
    });
  };
}

export function forgivenByAdmin(email) {
  return async function (dispatch) {
    await axios.put(`${BASE_URL}/Adminforgive/${email}`);
    return dispatch({
      type: "USER_FORGIVEN",
    });
  };
}

export function createComment(payload) {
  return async function (dispatch) {
    try {
      let json = await axios.post(`${BASE_URL}/comments/user`, payload);
      return json;
    } catch (err) {
      console.log(err);
    }
  };
}

export function getAppointmentsById(idApp) {
  console.log("llegue");

  return async (dispatch) => {
    try {
      var json = await axios.get(`${BASE_URL}/appointments/id/${idApp}`);
      return dispatch({ type: "GET_APP_INFO", payload: json.data });
    } catch (error) {
      console.log(error, "error en action apps by ID");
    }
  };
}

export function showModal(payload) {
  return {
    type: "SHOW_MODAL",
    payload,
  };
}
export function modalMedicalRecord(payload) {
  return {
    type: "MODAL_MEDICAL_RECORD",
    payload,
  };
}

export function modalProfessionalApps(payload) {
  return {
    type: "MODAL_PROFESSIONAL_APPS",
    payload,
  };
}

export function filterByAdmin({
  ranking,
  appointment,
  latestClients,
  active,
  grafic,
}) {
  return async function (dispatch) {
    var json = await axios.get(
      `${BASE_URL}/filterAdmin?ranking=${ranking}&appointment=${appointment}&latestClients=${latestClients}&active=${active}&grafic=${grafic}`
    );
    return dispatch({ type: "FILTER_BY_ADMIN", payload: json.data });
  };
}
export function graficsByAdmin({ grafic }) {
  return async function (dispatch) {
    var json = await axios.get(`${BASE_URL}/filterAdmin?grafic=${grafic}`);
    return dispatch({ type: "GRAFIC_BY_ADMIN", payload: json.data });
  };
}
export function filterprofessionalsByAdmin({ appointment }) {
  return async function (dispatch) {
    var json = await axios.get(
      `${BASE_URL}/filterAdmin?appointment=${appointment}`
    );
    return dispatch({
      type: "FILTER_BY_ADMIN_PROFESSIONALS",
      payload: json.data,
    });
  };
}
export function filterUsersByAdmin({ appointment }) {
  return async function (dispatch) {
    var json = await axios.get(
      `${BASE_URL}/filterAdmin?appointment=${appointment}`
    );
    return dispatch({ type: "FILTER_BY_ADMIN_USERS", payload: json.data });
  };
}

export function designeAdmin(userId) {
  return async function (dispatch) {
    await axios.put(`${BASE_URL}/adminDesigne/${userId}`);
    return dispatch({
      type: "DESIGNE_ADMIN",
    });
  };
}

export function degredeAdmin(userId) {
  return async function (dispatch) {
    await axios.put(`${BASE_URL}/adminDegrede/${userId}`);
    return dispatch({
      type: "DEGREDE_ADMIN",
    });
  };
}

export function getGrafic(medicalLicense) {
  return async (dispatch) => {
    try {
      var json = await axios.get(
        `${BASE_URL}/grafic/${medicalLicense.medicalLicense}`
      );
      return dispatch({ type: "GET_GRAFIC_INFO", payload: json.data });
    } catch (error) {
      console.log(error, "error en action GRAFIC");
    }
  };
}
export function reload(payload) {
  return {
    type: "RELOAD",
    payload,
  };
}
export function getAllSpecialtys() {
  return async function (dispatch) {
    var json = await axios.get(`${BASE_URL}/specialtys`);
    console.log(json.data);
    return dispatch({ type: "GET_ALL_SPECIALTYS", payload: json.data });
  };
}

export function addSpecialty(payload) {
  return async function (dispatch) {
    await axios.post(`${BASE_URL}/specialty`, payload);
  };
}


export function loader(payload) {
  return {
    type: "RELOAD",
    payload,
  };
}
export function getAdsFavorites(favorites) {
  //console.log(favorites, "soy el favorito reducer")
  return async function (dispatch) {
    var json = await axios.post(`${BASE_URL}/favoritesAds`, favorites);
    //console.log(json.data,"FAVORITOS");
    return dispatch({ type: "GET_ADS_FAVORITES", payload: json.data });
  };
}

