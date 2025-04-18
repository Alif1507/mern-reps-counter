import { useEffect, useState } from "react";
import "./App.css";
import { useRepsStore } from "../store/reps";

function App() {
  const [newRep, setNewRep] = useState({
    name: "",
    reps: "",
    waktu: "",
  });

  const { createRep } = useRepsStore();
  const handleAddRep = async () => {
    const { success, message } = await createRep(newRep);
    console.log("Success: ", success);
    console.log("Message: ", message);
    setNewRep({ name: "", reps: "", waktu: "" });
  };

  const {fetchReps, reps, deleteReps} = useRepsStore();
    useEffect(() => {
      fetchReps()
    }, [fetchReps])
    console.log("Reps", reps);

    const handleDelete = async (rid) => {
      const {success, message} = await deleteReps(rid)
      console.log("success: ", success);
        console.log("meassage: ", message);
    }

    
    

  return (
    <>
      <nav className="w-screen h-[140px] bg-blue-500 flex items-center text-center">
        <h1 className="text-white font-bold text-8xl ml-20">reps</h1>
      </nav>

      <main className="flex justify-between mx-30">
       <div>
       {reps.map((rep) => (
          <article className="flex flex-col">
          <div className="w-[816px] h-[193px] flex justify-between p-3 bg-blue-500 ml-10 mt-10">
            <div className="flex flex-col text-white">
              <h1 className="text-3xl font-bold">{rep.name}</h1>
              <h2 className="text-2xl font-bold">Reps : {rep.reps}</h2>
              <h2 className="text-2xl font-bold">{rep.waktu}</h2>
            </div>
            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-white cursor-pointer"
                onClick={() => handleDelete(rep._id)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </div>
          </div>
        </article>
        ))}
       </div>
        <section>
          <h1 className="font-bold text-3xl mt-10">Add New Workout</h1>
          <form className="flex flex-col items-start">
            <h1 className="text-blue-500 font-bold mt-5">Nama Workout</h1>
            <input
              type="text"
              className="border"
              value={newRep.name}
              onChange={(e) => setNewRep({ ...newRep, name: e.target.value })}
            />

            <h1 className="text-blue-500 font-bold mt-5">Repitisi</h1>
            <input
              type="text"
              className="border"
              value={newRep.reps}
              onChange={(e) => setNewRep({ ...newRep, reps: e.target.value })}
            />

            <h1 className="text-blue-500 font-bold mt-5">Waktu</h1>
            <input
              type="text"
              className="border"
              value={newRep.waktu}
              onChange={(e) => setNewRep({ ...newRep, waktu: e.target.value })}
            />

            <button className="bg-blue-500 text-white p-2 mt-3" onClick={handleAddRep}>
              Add Workout
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default App;
