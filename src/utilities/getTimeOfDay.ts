const getTimeOfDay = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
        return "morning";
    } else if (currentHour >= 12 && currentHour < 18) {
        return "afternoon";
    } else {
        return "evening";
    }
};

export default getTimeOfDay;