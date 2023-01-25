import { gql } from "@apollo/client";

export const REFRESH_TOKEN = gql`
  mutation refreshToken {
    refreshToken {
      tokens {
        access_token
        refresh_token
      }
      data {
        email
        id
        phoneNumber
        role
      }
    }
  }
`;

export const SIGN_IN = gql`
  mutation signin($password: String = "", $phoneNumber: String = "") {
    signIn(password: $password, phoneNumber: $phoneNumber) {
      data {
        email
        id
        role
        phoneNumber
      }
      tokens {
        access_token
        refresh_token
      }
    }
  }
`;

// find labour id by record number
export const LABOR_BY_RECORD_NUM = gql`
  query MyQuery($_eq: registration_uuid = "") {
    registration_namespace {
      labors(where: { id: { _eq: $_eq } }) {
        id
        biometrics_completed
        birth_date
        disability
        father_name
        first_name
        grand_father_name
        gender
        labor_id
        level_of_education
        martial_status
        record_number
        registration_id
        signature
        unemployment_period
        biometrics_id
        profile_picture
      }
    }
  }
`;

// find labour  by biometrics id
export const LABOR_BY_BIOMETRICS_ID = gql`
  query MyQuery($_eq: String = "") {
    registration_namespace {
      labors(where: { biometrics_id: { _eq: $_eq } }) {
        id
        biometrics_completed
        birth_date
        disability
        father_name
        first_name
        grand_father_name
        gender
        labor_id
        level_of_education
        martial_status
        record_number
        registration_id
        signature
        unemployment_period
        biometrics_id
        profile_picture
      }
    }
  }
`;

export const FILE_UPLOAD = gql`
  mutation file_upload(
    $extension: String = ""
    $file: String = ""
    $folder_id: String = ""
  ) {
    fileUpload(extension: $extension, file: $file, folder_id: $folder_id) {
      path
    }
  }
`;

export const FACE_REGISTER = gql`
  mutation FACE_REGISTER(
    $labor_id: String = ""
    $left_photo: String = ""
    $middle_photo: String = ""
    $right_photo: String = ""
  ) {
    faceRegister(
      labor_id: $labor_id
      left_photo: $left_photo
      middle_photo: $middle_photo
      right_photo: $right_photo
    ) {
      data
    }
  }
`;

export const FINGER_PRINT_REGISTER = gql`
  mutation FINGER_PRINT_REGISTER(
    $archive_file: String = ""
    $labor_id: String = ""
  ) {
    fingerprintRegister(archive_file: $archive_file, labor_id: $labor_id) {
      data
    }
  }
`;

export const IRIS_REGISTER = gql`
  mutation IRIS_REGISTER($archive_file: String = "", $labor_id: String = "") {
    eyerisRegister(archive_file: $archive_file, labor_id: $labor_id) {
      data
    }
  }
`;

export const FINGERPRINT_VERIFY = gql`
  mutation FINGERPRINT_VERIFY(
    $fingerprint_image: String = ""
    $gender: String = ""
    $region: String = ""
  ) {
    fingerprintIdentify(
      fingerprint_image: $fingerprint_image
      gender: $gender
      region: $region
    ) {
      details
    }
  }
`;

export const FACE_VERIFY = gql`
  mutation FACE_VERIFY(
    $gender: String = ""
    $photo: String = ""
    $region: String = ""
  ) {
    faceIdentify(gender: $gender, photo: $photo, region: $region) {
      details
    }
  }
`;

export const IRIS_VERIFY = gql`
  mutation IRIS_VERIFY(
    $region: String = ""
    $iris_image: String = ""
    $gender: String = ""
  ) {
    irisIdentify(region: $region, iris_image: $iris_image, gender: $gender) {
      details
    }
  }
`;
