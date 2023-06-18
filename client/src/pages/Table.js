
import React from 'react'

const Table = () => {
  return (
    <div class="table-responsive-sm">
        <table className="table align-middle mb-0  ">
        <thead className="text-light text-center">
                <tr>
                  <th>RECENT PROJECTS</th>
                  <th>CREATED</th>
                  <th>REPORTER</th>
                  <th>DUE</th>
                  <th>STATS</th>
                </tr>
        </thead>
              <br/>
              <tbody>
                <tr>
                  <td>
                    <div class="d-flex align-items-center">
                      <img
                        src="https://marketplacecontent.zoom.us/%2FnptAB68BTdO6Jrc_A6ROUA%2FDdIgA0x-QJKBkUaxQR_Q5A%2Fapp%2FtKVbP0NiSve_Mul31LfEEw%2FpHAZ_eIvRJi7OmEEMDq6QA.png"
                        alt=""
                        style={{ width: "50px", height: "50px" }}
                        class="rounded-circle"
                      /> 
                      <div class="ms-3">
                        <p class="fw-bold mb-1">Collabee Private Co</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="fw-normal mb-0">Thu, 26 Oct</p>
                    
                  </td>
                  <td>
                    Christian Matthews
                  </td>
                  <td>Sat, 28 Oct</td>
                  <td>
                  <button type="button" class="btn btn-primary">IN PROGRESS</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="d-flex align-items-center">
                      <img
                        src="https://imageio.forbes.com/specials-images/imageserve/5cd9d263169cc600095f2398/0x0.jpg?format=jpg&crop=1200,1200,x0,y0,safe&height=87&width=87"
                        class="rounded-circle"
                        alt=""
                        style={{ width: "50px", height: "50px" }}
                      />
                      <div class="ms-3">
                        <p class="fw-bold mb-1">Target</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="fw-normal mb-0">Wed, 25 Oct</p>
                  </td>
                  <td>
                   Arthur Cook
                  </td>
                  <td>Fri, 27 Oct</td>
                  <td>
                  <button type="button" class="btn btn-danger">FINISHED</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="d-flex align-items-center">
                      <img
                        src="https://img.freepik.com/free-vector/green-logo-eco-house-eco-home-surrounded-by-grass-with-leaf-roof-environmentally-low-impact-eco-friendly-construction_1284-43014.jpg?w=2000"
                        class="rounded-circle"
                        alt=""
                        style={{ width: "50px", height: "50px" }}
                      />
                      <div class="ms-3">
                        <p class="fw-bold mb-1">Gramma Limited</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="fw-normal mb-0">Tue, 24 Oct</p>
                  </td>
                  <td>
                    Evelyn Tucker
                  </td>
                  <td>Thu, 26 Oct</td>
                  <td>
                  <button type="button" class="btn btn-primary">IN PROGRESS</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="d-flex align-items-center">
                      <img
                        src="https://i.pinimg.com/originals/2c/b1/a5/2cb1a59484ed73766fd11474667ace8a.jpg"
                        class="rounded-circle"
                        alt=""
                        style={{ width: "50px", height: "50px" }}
                      />
                      <div class="ms-3">
                        <p class="fw-bold mb-1">Cambr Card</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="fw-normal mb-0">Mon, 23 Oct</p>
                  </td>
                  <td>
                    Donald Curtis
                  </td>
                  <td>Wed, 25 Oct</td>
                  <td>
                  <button type="button" class="btn btn-danger">FINISHED</button>
                  </td>
                </tr>
              </tbody>
        </table>
    </div>
  )
}

export default Table