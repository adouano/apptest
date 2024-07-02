
// C. Asynchronous Validation:
const checkUsernameAvailability = async (username) => {
    const response = await fetch(`/api/users/${username}`);
    return response.ok;
  };
  
  const MyForm = () => {
    const [usernameAvailable, setUsernameAvailable] = useState(false);
  
    const handleUsernameChange = async (e) => {
      const username = e.target.value;
      setUsernameAvailable(await checkUsernameAvailability(username));
    };
  
    return (
      <form>
        <input type="text" onChange={handleUsernameChange} />
        {usernameAvailable ? 'Username available' : 'Username already taken'}
        <button disabled={!usernameAvailable}>Submit</button>
      </form>
    );
  };



  