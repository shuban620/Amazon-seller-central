import React, { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import './body.css';
import './bootstrap.min.css';
import {
  Chart,
  registerables // Automatically registers necessary components
} from 'chart.js';
import axios from 'axios';
import * as XLSX from 'xlsx';
// Correct import statement

Chart.register(...registerables); // Register all necessary components

const Body = () => {
  const chartInstanceLeft = useRef(null); // Ref for the first chart (main-chart)
  const chartInstanceRight = useRef(null); // Ref for the second chart (chart-right)

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('1');
  const [chartData, setChartData] = useState({
    mainChart: {
      labels: [],
      datasets: []
    },
    chartRight: {
      labels: [],
      datasets: []
    }
  });

  useEffect(() => {
    fetchSalesData();
  }, [selectedFilter, startDate, endDate]);

  async function fetchSalesData() {
    try {
      // Use template literals to correctly interpolate the selectedFilter variable
      const response = await axios.get(`http://localhost:5000/api/sales-data?filterType=${selectedFilter}`);
      const salesData = response.data;

      // Process the sales data
      const processedData = processSalesData(salesData);

      // Update the chart data state
      if (processedData) {
        setChartData(processedData);
      }
    } catch (error) {
      console.error('Error fetching sales data:', error);
      if (axios.isAxiosError(error)) {  // Check if it's an Axios error
        if (error.response) {
          console.error('Response data:', error.response.data);  // Log the response data for more info
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
          alert(`Error fetching sales data: ${error.response.status} - ${error.response.data.error || error.message}`);
        } else if (error.request) {
          console.error('Request:', error.request);
          alert('Error fetching sales data: No response received from the server.');
        } else {
          console.error('Error:', error.message);
          alert('Error fetching sales data: ' + error.message);
        }
      } else {
        console.error('Error:', error);
        alert('Error fetching sales data: An unexpected error occurred.');
      }
    }
  }

  const processSalesData = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      console.error('Invalid or empty data received:', data);
      return { mainChart: {}, chartRight: {} };
    }

    // Define static x-axis labels for the charts
    const xAxisLabels = ['12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM'];

    // Prepare datasets for each graph
    const orderedProductSalesData1 = data.map(() => Math.random() * 10000); // Replace with actual logic if needed
    const orderedProductSalesData2 = data.map(() => Math.random() * 10000); // Replace with actual logic if needed
    const orderedProductSalesData3 = data.map(() => Math.random() * 10000); // Replace with actual logic if needed

    const unitsOrderedData1 = data.map(() => Math.random() * 100); // Replace with actual logic if needed
    const unitsOrderedData2 = data.map(() => Math.random() * 100); // Replace with actual logic if needed
    const unitsOrderedData3 = data.map(() => Math.random() * 100); // Replace with actual logic if needed

    const mainChart = {
      labels: xAxisLabels, // Use static labels here
      datasets: [
        {
          label: 'Ordered Product Sales - 80%',
          data: orderedProductSalesData1,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          fill: false,
          pointRadius: 0,  // Radius of the points (for hover detection)
          pointHoverRadius: 7  // Radius of the points when hovered
        },
        {
          label: 'Ordered Product Sales - 60%',
          data: orderedProductSalesData2,
          backgroundColor: 'rgba(255, 206, 86, 0.6)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1,
          fill: false,
          pointRadius: 0,  // Radius of the points (for hover detection)
          pointHoverRadius: 7  // Radius of the points when hovered
        },
        {
          label: 'Ordered Product Sales - 40%',
          data: orderedProductSalesData3,
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
          fill: false,
          pointRadius: 0,  // Radius of the points (for hover detection)
          pointHoverRadius: 7  // Radius of the points when hovered
        },
      ],
    };

    const chartRight = {
      labels: xAxisLabels, // Use static labels here
      datasets: [
        {
          label: 'Units Ordered - 80%',
          data: unitsOrderedData1,
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          fill: false,
          pointRadius: 0,  // Radius of the points (for hover detection)
          pointHoverRadius: 7  // Radius of the points when hovered
        },
        {
          label: 'Units Ordered - 60%',
          data: unitsOrderedData2,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          fill: false,
          pointRadius: 0,  // Radius of the points (for hover detection)
          pointHoverRadius: 7  // Radius of the points when hovered
        },
        {
          label: 'Units Ordered - 40%',
          data: unitsOrderedData3,
          backgroundColor: 'rgba(255, 159, 64, 0.6)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1,
          fill: false,
          pointRadius: 0,  // Radius of the points (for hover detection)
          pointHoverRadius: 7  // Radius of the points when hovered
        },
      ],
    };

    return { mainChart, chartRight };
  };





  useEffect(() => {
    const ctxLeft = document.getElementById('main-chart').getContext('2d'); // Get canvas context for main-chart
    const ctxRight = document.getElementById('chart-right').getContext('2d'); // Get canvas context for chart-right

    // Destroy existing charts if they exist
    if (chartInstanceLeft.current) {
      chartInstanceLeft.current.destroy();
    }
    if (chartInstanceRight.current) {
      chartInstanceRight.current.destroy();
    }

    // Log the chart data to the console to verify
    console.log('Chart Data:', chartData);

    // Create the first Chart instance (main-chart)
    chartInstanceLeft.current = new Chart(ctxLeft, {
      type: 'line',
      data: chartData.mainChart,
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            intersect: false,
          },
        },
        scales: {
          x: {
            title: { display: true, text: 'Time of Day' },
          },
          y: { beginAtZero: true },
        },
      },
    });

    // Create the second Chart instance (chart-right)
    chartInstanceRight.current = new Chart(ctxRight, {
      type: 'line',
      data: chartData.chartRight,
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            intersect: false,
          },
        },
        scales: {
          x: {
            title: { display: true, text: 'Time of Day' },
          },
          y: { beginAtZero: true },
        },
      },
    });




    // Clean up: Destroy chart instances on component unmount
    return () => {
      if (chartInstanceLeft.current) {
        chartInstanceLeft.current.destroy();
      }
      if (chartInstanceRight.current) {
        chartInstanceRight.current.destroy();
      }
    };
  }, [chartData]);

  // Custom function to check if a given date is a Friday
  const isFriday = (date) => {
    const dayOfWeek = new Date(date).getDay();
    return dayOfWeek === 5; // 0 = Sunday, 1 = Monday, ..., 5 = Friday
  };

  // Handle date change
  const handleStartDateChange = (date) => {
    if (!isFriday(date)) {
      setStartDate(date);
    } else {
      setStartDate(null);
      alert('Holiday on Friday');
    }
  };

  const handleEndDateChange = (date) => {
    if (!isFriday(date)) {
      setEndDate(date);
    } else {
      setEndDate(null);
      alert('Holiday on Friday');
    }
  };

  // Handle file upload
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('File uploaded successfully:', response.data);

      // Parse the Excel file
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Assuming the first row is headers and the rest are data
        const headers = json[0];
        const salesData = json.slice(1).map(row => {
          const [time, month, year, orderedProductSales, unitsOrdered, ...rest] = row;
          const date = new Date(time);
          console.log('Time:', time, 'Parsed Date:', date); // Debug log
          return {
            Time: date,
            MONTH: month,
            YEAR: year,
            DAY: date.getDate(), // Extract day from the date string
            'Ordered product sales': orderedProductSales,
            'Units ordered': unitsOrdered
          };
        });

        // Process the sales data
        const processedData = processSalesData(salesData);

        // Update the chart data state
        if (processedData) {
          setChartData(processedData);
        }
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error('Error uploading file:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Status code:', error.response.status);
        console.error('Headers:', error.response.headers);
        alert(`Error uploading file: ${error.response.status} - ${error.response.data.error || error.message}`);
      } else if (error.request) {
        console.error('Request:', error.request);
        alert('Error uploading file: No response received from the server.');
      } else {
        console.error('Error:', error.message);
        alert('Error uploading file: ' + error.message);
      }
      console.error('Config:', error.config);
    }
  };


  // Handle applying filters
  const handleApply = () => {
    fetchSalesData();
  };

  // Ref for the file input
  const fileInputRef = useRef(null);

  // Handle file input click
  const handleFileButtonClick = () => {
    fileInputRef.current.click(); // Trigger click on hidden input
  };

  // <------------------for current date in my filter selecter dropdown--------------->
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');

    const formatted = `${month}/${day}/${year}`;
    setFormattedDate(formatted);
  }, []); // Empty dependency array means this effect runs once on mount


  return (
    <div >
      <div className="sidenav container p-0 gap-y-5" style={{ height: '-webkit-fill-available', width: '240px', zIndex: "2", top: "6.3rem", left: "0" }}>
        <div className="sidebar-header border-bottom d-flex align-items-center">
          <span className="closebtn"
          // onClick={closeNav}
          >&times; </span><span style={{ color: "#00626E", fontSize: "1rem" }}>CLOSE REPORTS MENU</span>
        </div>
        <div>
          <a className="btn text-dark text-start fs-6 bg-body-secondary fw-bold border-0" href="#">
            Dashboard
          </a>
        </div>
        <div>
          <a className="btn text-dark text-center fs-6 fw-bolder border-0" href="#">
            Sales Dashboard
          </a>
        </div>
        <div>
          <a className="btn text-dark text-start fs-6 bg-body-secondary fw-bold border-0" href="#">
            Bussiness Reports
          </a>
        </div>
        <div>
          <a className="btn text-dark text-start fs-6 border-0" href="#">
            By Date
          </a>
        </div>
        <div>
          <a className="btn  text-start fs-6 fw-bolder border-0" style={{ color: "#00626E" }} href="#">
            Sales and Traffic
          </a>
        </div>
        <div>
          <a className="btn  text-start fs-6 fw-bolder border-0" style={{ color: "#00626E" }} href="#">
            Detail Page Sales and Traffic
          </a>
        </div>
        <div>
          <a className="btn  text-start fs-6 fw-bolder border-0" style={{ color: "#00626E" }} href="#">
            Seller Performance
          </a>
        </div>
        <div>
          <a className="btn text-dark text-start fs-6 border-0" href="#">
            By ASIN
          </a>
        </div>
        <div>
          <a className="btn  text-start fs-6 fw-bolder border-0" style={{ color: "#00626E" }} href="#">
            Detail Page Sales and Traffic
          </a>
        </div>
        <div>
          <a className="btn  text-start fs-6 fw-bolder border-0" style={{ color: "#00626E" }} href="#">
            Detail Page Sales and Traffic by Parent Items
          </a>
        </div>
        <div>
          <a className="btn  text-start fs-6 fw-bolder border-0" style={{ color: "#00626E" }} href="#">
            Detail Page Sales and Traffic by Child Items
          </a>
        </div>
        <div>
          <a className="btn  text-start fs-6 fw-bolder border-0" style={{ color: "#00626E" }} href="#">
            Brand Performance
          </a>
        </div>
        <div>
          <a className="btn text-dark text-start fs-6 border-0" href="#">
            Other
          </a>
        </div>
        <div>
          <a className="btn  text-start fs-6 fw-bolder border-0" style={{ color: "#00626E" }} href="#">
            Sales and Orders by month
          </a>
        </div>
      </div>
      <div className="container-fluid" style={{
        overflowX: 'hidden',
        paddingLeft: '16rem',
        paddingRight: '1rem', marginTop: '9rem',
      }}>

        <div style={{ width: '-webkit-fill-available' }} className='container d-flex justify-content-between align-items-center'>
          <div className='d-flex justify-content-left mb-3 align-items-center'>
            <h1>Sales Dashboard</h1>
            <p style={{ color: '#00626E', fontWeight: 'bold' }}>Learn more</p>
          </div>

          <div className='d-flex gap-2 align-items-center mb-3'>
            <input
              ref={fileInputRef} // Set the ref
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              style={{ display: 'none' }} // Hide the input
            />
            <button
              onClick={handleFileUpload}
              className='px-2'
              style={{ color: '#128399', border: '2px solid #128399', backgroundColor: 'white' }}>
              Refresh
            </button>
            <button
              onClick={handleFileButtonClick}
              style={{ color: 'white', backgroundColor: ' #128399', border: '2px solid #128399' }}>
              Download
            </button>
          </div>
        </div>

        <div className='container my-3 p-4 py-5' style={{ backgroundColor: '#ebeced', width: '-webkit-fill-available' }}>
          <div className='row d-flex align-items-center mb-3'>
            <div className='col-lg-2'>
              <div className="form-group">
                <div><h5>Date</h5></div>
                <select
                  className="form-select py-2 px-3 mb-2 rounded-0"
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  <option value="">Select a Filter</option>
                  <option value="1">Today - {formattedDate}</option>
                  <option value="2">Week to Date - {formattedDate}</option>
                  <option value="3">Month to Date - {formattedDate}</option>
                  <option value="4">Year to Date - {formattedDate}</option>
                  <option value="5" style={{ position: 'relative', top: '-1px' }}>Custom</option>
                </select>
                {selectedFilter === '5' && (
                  <div style={{ position: 'absolute' }} className='d-flex justify-content-between gap-2 align-items-center'>
                    <div className=''>
                      <DatePicker
                        className="form-control py-2 px-3 rounded-0"
                        id="start-date"
                        selected={startDate}
                        onChange={handleStartDateChange}
                        dateFormat="MM/dd/yyyy"
                        placeholderText="Select Start Date"
                      />
                    </div>
                    <div className=''>
                      <DatePicker
                        className="form-control py-2 px-3 rounded-0"
                        id="end-date"
                        selected={endDate}
                        onChange={handleEndDateChange}
                        dateFormat="MM/dd/yyyy"
                        minDate={startDate}
                        placeholderText="Select End Date"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className='col-lg-3 col-md-6 col-sm-12'>
              <div className="form-group mb-2">
                <div><h5>Sales Breakdown</h5></div>
                <select
                  className="form-select py-2 px-3 no-border rounded-0"
                  id="role"
                  defaultValue="1"
                >
                  <option value="1" >Market Total</option>
                  <option value="2">option 1</option>
                  <option value="3">option 2</option>
                  <option value="4">option 3</option>
                </select>

              </div>
            </div>
            <div className='col-lg-3 col-md-6 col-sm-12'>
              <div className="form-group mb-2">
                <div><h5>Fulfillment channel</h5></div>
                <select
                  className="form-select py-2 px-3 no-border rounded-0"
                  id="role"
                  defaultValue="1"
                >
                  <option value="1">Both (Amazon and seller)</option>
                  <option value="2">option 1</option>
                  <option value="3">option 2</option>
                  <option value="4">option 3</option>
                </select>
              </div>
            </div>
            <div className='col-lg-3 col-md-12'>
              <div className="form-group">
                <button
                  style={{ color: 'white', backgroundColor: '#00626E' }}
                  className='py-2 px-3 border-0 mt-4'
                  onClick={handleApply}
                >
                  APPLY
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='container border my-3' style={{ width: '-webkit-fill-available' }}>
          <div className='row'>
            <div style={{ backgroundColor: '#fafafa' }} className='col-lg-12 col-md-12 col-sm-12 border-bottom'>
              <div className='d-flex gap-2 align-items-center mb-2 p-2'>
                <h2>Sales Snapshot</h2>
                <span>taken at 12:00 PM on 01/01/2022 PST</span>
              </div>
            </div>
            <div className='col-lg-12 col-md-12 col-sm-12 d-flex align-items-center mb-3'>
              <div className='col-lg-2 col-md-4 col-sm-6 p-2'>
                <div>
                  <p>Total Order Items</p>
                </div>
                <div>
                  <h3>2</h3>
                </div>
              </div>
              <div className='col-lg-2 col-md-4 col-sm-6 p-2'>
                <div>
                  <p>Units Ordered</p>
                </div>
                <div>
                  <h3>3</h3>
                </div>
              </div>
              <div className='col-lg-2 col-md-4 col-sm-6 p-2'>
                <div>
                  <p>Ordered Product Sales</p>
                </div>
                <div>
                  <h3>$23.97</h3>
                </div>
              </div>
              <div className='col-lg-2 col-md-4 col-sm-6 p-2'>
                <div>
                  <p>Avg. units/order item</p>
                </div>
                <div>
                  <h3>1.5</h3>
                </div>
              </div>
              <div className='col-lg-2 col-md-4 col-sm-6 p-2'>
                <div>
                  <p>Avg. Sales/ordered items</p>
                </div>
                <div>
                  <h3>$11.99</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container border my-3 p-4 graph-section" style={{ backgroundColor: '#EBF7FF', width: '-webkit-fill-available' }}>
          <div className="d-flex justify-content-between align-items-center">
            <h2>Compare Sales</h2>
            <div className="btn-group rounded-0" style={{ border: '1px solid #1a7b8f' }} role='group'>
              <button type="button" style={{ backgroundColor: '#1a7b8f' }} className="btn text-white rounded-0">Graph view</button>
              <button type="button" className="btn bg-white">Table view</button>
            </div>
          </div>
          <div className="row mt-3 bg-white p-2 border">
            <div className="col-lg-6 col-md-12">
              <canvas id="main-chart"></canvas>
            </div>
            <div className="col-lg-6 col-md-12">
              <canvas id="chart-right" className="chart"></canvas>
            </div>
          </div>
          <div className='col-lg-10'>
            <div className='d-flex align-items-start gap-3 pt-4'>
              <div className='col-lg-2 col-md-10'>
                <h2>Compare</h2>
                <h5 style={{ color: '#8bc0cc' }}>What's this</h5>
              </div>
              <div className='col-lg-2 col-md-5 col-sm-10 border-start p-2'>
                <div className='d-flex gap-2'>
                  <div><input type="checkbox" name="checkbox" id="" /></div>
                  <div>
                    <div>
                      <h6 style={{ color: '#97d3de' }} className='mb-1'>Today so far</h6>
                    </div>
                    <div>
                      <p className='mb-1'>So far</p>
                    </div>
                    <div>
                      <p className='mb-1'><span className='fw-bold'>3</span> Units</p>
                    </div>
                    <div>
                      <h5>$23.97</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-lg-2 col-md-5 col-sm-10 border-start p-2'>
                <div className='d-flex gap-2'>
                  <div><input type="checkbox" name="checkbox" id="" /></div>
                  <div>
                    <div>
                      <h6 style={{ color: 'red' }} className='mb-1'>Yesterday</h6>
                    </div>
                    <div>
                      <p className='mb-1'>By end of day</p>
                    </div>
                    <div>
                      <p className='mb-1'><span className='fw-bold'>48</span> Units</p>
                    </div>
                    <div>
                      <h5>$398.46</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-lg-3 col-md-5 col-sm-10 border-start p-2'>
                <div className='d-flex gap-2'>
                  <div><input type="checkbox" name="checkbox" id="" /></div>
                  <div>
                    <div>
                      <h6 style={{ color: 'orange' }} className='mb-1'>Same day last week</h6>
                    </div>
                    <div>
                      <p className='mb-1'>By end of day</p>
                    </div>
                    <div>
                      <p className='mb-1'><span className='fw-bold'>33</span> Units</p>
                    </div>
                    <div>
                      <h5>$263.67</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-lg-3 col-md-5 col-sm-10 border-start border-end p-2'>
                <div className='d-flex gap-2'>
                  <div><input type="checkbox" name="checkbox" id="" /></div>
                  <div>
                    <div>
                      <h6 style={{ color: 'gray' }} className='mb-1'>Same day last year</h6>
                    </div>
                    <div>
                      <p className='mb-1'>By end of day</p>
                    </div>
                    <div>
                      <p className='mb-1'><span className='fw-bold mb-1'>49</span> Units</p>
                    </div>
                    <div>
                      <h5>$509.51</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-2'></div>
        </div>
      </div>
    </div>
  );
};

export default Body;
