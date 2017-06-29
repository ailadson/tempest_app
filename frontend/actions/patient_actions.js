import * as APIUtil from '../util/patient_api_util'

export const RECEIVE_ALL_PATIENTS = 'RECEIVE_ALL_PATIENTS';
export const UPDATE_PATIENT = 'UPDATE_PATIENT';

export const receiveAllPatients = patients => ({
  type: RECEIVE_ALL_PATIENTS,
  patients
});

export const updatePatient = patient => ({
  type: UPDATE_PATIENT,
  patient
});

export const fetchPatients = (dispatch, cb) => {
  APIUtil.fetchPatients(patients => {
    console.log(patients);
    dispatch(receiveAllPatients(patients))
    if (cb) cb(patients);
  }, err => {
    console.log("ERROR");
    console.log(err);
  });
};

export const createAppointment = (data, dispatch, cb) => {
  APIUtil.createAppointment(data, patient => {
    dispatch(updatePatient(patient))
    if (cb) cb(patient);
  }, err => {
    console.log("ERROR");
    console.log(err);
  });
};

export const updateAppointment = (data, dispatch, cb) => {
  APIUtil.updateAppointment(data, patient => {
    dispatch(updatePatient(patient))
    if (cb) cb(patient);
  }, err => {
    console.log("ERROR");
    console.log(err);
  });
};

export const deleteAppointment = (data, dispatch, cb) => {
  APIUtil.deleteAppointment(data, patient => {
    dispatch(updatePatient(patient))
    if (cb) cb(patient);
  }, err => {
    console.log("ERROR");
    console.log(err);
  });
};

export const createFile = (data, dispatch, cb) => {
  APIUtil.createFile(data, patient => {
    dispatch(updatePatient(patient))
    if (cb) cb(patient);
  }, err => {
    console.log("ERROR");
    console.log(err);
  });
};

export const deleteFile = (data, dispatch, cb) => {
  APIUtil.deleteFile(data, patient => {
    dispatch(updatePatient(patient))
    if (cb) cb(patient);
  }, err => {
    console.log("ERROR");
    console.log(err);
  });
};
