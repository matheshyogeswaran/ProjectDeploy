
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/Navbar";
import TableSort from "../components/Leaderboard/TableSort";
//import Sort from "../components/Leaderboard/Sort";
import JobRole from "../components/Leaderboard/Jobrole";
import "./../css/LeadBoard.css"


function LeadBoard() {
	
	//const [sort, setSort] = useState({ sort: "rating", order: "desc" });
	const [selectedUserRoleName, setSelectedUserRoleName] = useState("");
	const [filteruserRoleName, setFilteruserRoleName] = useState([]);

	const [sortBy, setSortBy] = useState('')
	const [sortOrder, setSortOrder] = useState('')

	
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
  	const obj = { limit: 10, total: 50 };

	// Do something with the selectedJobRole changed
	useEffect(()=>{
		if(selectedUserRoleName !==""){
			
		}
	}, [selectedUserRoleName])

	useEffect(()=>{
		
	}, [sortBy])

	useEffect(()=>{
		
	}, [sortOrder])

	return (
        <div>
        <NavBar /><br/><br/>
            <div className="full-wrapper">
			<div className="full-container">
				{/* <div
                    className="side-bar"
                    style={{ position: "fixed", left: "0", top: "64px", bottom: "0" }}
				>
                    <SideBar />
                </div> */}
				<div className="full-head">
					<img src="./images/logo.png" alt="logo" className="logo" />
					<h1 h1 className="head">Leader Board</h1>
				</div>
				<div className="full-body">
					<div className="table_container">
						<TableSort sortBy = {sortBy} sortOrder={sortOrder} userRoleName={selectedUserRoleName} details={obj.details ? obj.details : []} />
					</div>
					
					<div className="filter_container">
					{/* <Sort setSortBy={setSortBy} setSortOrder={setSortOrder} /> */}
						<JobRole userRoleName={setSelectedUserRoleName}/>
					</div>
				</div>
			</div>
		</div>
        </div>
	);
}

export default LeadBoard;
