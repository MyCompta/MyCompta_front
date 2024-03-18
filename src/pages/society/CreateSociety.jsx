export const CreateSociety


useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl + "societies",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": JSON.parse(Cookies.get("token")).token,
        }
        body:JSON
      });


      if(response.ok) {
        const data = await response.json();
        setSocietyData(data);
      } else {
        setError('unavailable list of societies')
      }
    } catch (error) {
    setError('no answer from server')
    }
  }

fetchData()

},[]);

