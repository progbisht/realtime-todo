import ListTask from "./ListTask"
import useData from "./hooks/useData"

const Content = () => {

    const { list, fetchErr, handlePrevious, handleNext, currentPage, totalPages, errMessage } = useData()
    
    return (
        <>
            <section>
                <p className="errorMsg">{errMessage}</p>
                {/* {
                    loading && <p>Loading...</p>
                }*/}
                {
                    fetchErr && <p className="errorMsg">{fetchErr}</p>
                } 
                {
                 
                    // !loading &&  
                    !fetchErr && 
                        (
                            
                            <ul>
                                {
                                    list.length === 0 ? "Add Tasks" 
                                        : list.map( (task) =>(
                                            <ListTask
                                                key={task.id}
                                                task={task}
                                            />
                                        ))
                                }
                            </ul>
                            
                            
                            
                        )
                }
                
            </section>
            <div className="base">
                <span className={currentPage === 1 ? "btn-dis" : "btn"} onClick={handlePrevious} disabled={currentPage === 1}>
                    Previous Page
                </span>
                <span>{`${currentPage} out of ${totalPages}`}</span>
                <span className={currentPage === totalPages ? "btn-dis" : "btn"} onClick={handleNext} disabled={currentPage === totalPages}>
                    Next Page
                </span>
            </div>
        </>
    )
}

export default Content