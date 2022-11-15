
export type CredentialType = { email: string, password: string }

export type RegisterUserType = CredentialType & {
    first_name: string,
    last_name: string,
    date_of_birth: string,
}
