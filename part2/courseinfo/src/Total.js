const Total = ({parts}) => {

    const total = parts.map(x => x.exercises).reduce((a,b) => a+b, 0)
    
    return (
        <p>Number of exercises: {total}</p>
    )
}

export default Total; 