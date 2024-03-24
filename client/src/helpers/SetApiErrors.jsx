export const SetApiErrors = (errors,setFunc) => {
    Object.keys(errors).forEach((field) => {
        setFunc(field, {
            type: 'manual',
            message: errors[field],
        })
    })
}