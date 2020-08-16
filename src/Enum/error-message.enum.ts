export enum ErrorMessage{
    REQUIRED = 'This field is required',
    EMAIL = 'This is not a valid email',
    TELEPHONE = 'Enter a valid contact number',
    LENGTH = 'It should contain exact _ characters', // these _ should be replaced by the parameter number when used
    MIN_LENGTH = 'It should contain minimum _ characters',
    MAX_LENGTH = 'It should not contain more than _ characters'
}