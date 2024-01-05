




// export const customDateFormat = (date) => {
//     const dateFields = { 
//         year: 'numeric', 
//         month: 'short', 
//         day: 'numeric',
//         weekday: 'long'
//     };


//     const formattedDate = new Date(date).toLocaleDateString('en-US', dateFields);
//     console.log(formattedDate)
//     return formattedDate;
// }


export const customDateFormat = (date) => {
    const dateFields = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        weekday: 'long'
    };

    // specifying english/US for lanuage/Timezone, and to include dateFields attributes and format in UTC
    const formattedDate = new Date(date).toLocaleDateString('en-US', { ...dateFields, timeZone: 'UTC' });
    console.log(formattedDate);
    return formattedDate;
}
