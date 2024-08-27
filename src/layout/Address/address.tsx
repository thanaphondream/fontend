import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useParams, Link, useNavigate } from 'react-router-dom'; 

const Address = () => {
    const [ user, setUser] = useState({})
    const { id } = useParams(); 
    const navigate = useNavigate()
    const [mapPosition, setMapPosition] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [amphures, setAmphures] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedAmphure, setSelectedAmphure] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [formData, setFormData] = useState({
        address: '',
        provinces: '',
        amphures: '',
        districts: '',
        zip_code: '',
        road: '',
        village: '',
        house_number: '',
        other: '',
        longitude: '',
        latitude: '',
        userId: '',
    });

    

    const hdlChange = e => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8889/location/provinces', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProvinces(response.data);
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        };

        fetchProvinces();
    }, []);

    useEffect(() => {
        const fetchAmphures = async () => {
            if (selectedProvince) {
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.get(`http://localhost:8889/location/amphures?province_id=${selectedProvince}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setAmphures(response.data);
                    setDistricts([]);
                    setSelectedAmphure(null);
                } catch (error) {
                    console.error('Error fetching amphures:', error);
                }
            }
        };

        fetchAmphures();
    }, [selectedProvince]);

    useEffect(() => {
        const fetchUser = async () => {
          try{
            const token1 = localStorage.getItem('token')
            const response01 = await axios.get(`http://localhost:8889/auth/user`,{
              headers: {Authorization: `Bearer ${token1}`}
            })
            setUser(response01.data)
          }catch (error){
            console.error('Error fetching product:', error)
          }
        }
    
        fetchUser()
      }, [])

    useEffect(() => {
        const fetchDistricts = async () => {
            if (selectedAmphure) {
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.get(`http://localhost:8889/location/districts?amphure_id=${selectedAmphure}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setDistricts(response.data);
                    setSelectedDistrict(null);
                } catch (error) {
                    console.error('Error fetching districts:', error);
                }
            }
        };

        fetchDistricts();
    }, [selectedAmphure]);

    const handleProvinceChange = (event) => {
        const provinceId = event.target.value;
        setSelectedProvince(provinceId);
        setFormData(prev => ({ ...prev, provinces: event.target.options[event.target.selectedIndex].text }));
    };

    const handleAmphureChange = (event) => {
        const amphureId = event.target.value;
        setSelectedAmphure(amphureId);
        setFormData(prev => ({ ...prev, amphures: event.target.options[event.target.selectedIndex].text }));
    };

    const handleDistrictChange = (event) => {
        const districtId = event.target.value;
        setSelectedDistrict(districtId);
        setFormData(prev => ({ ...prev, districts: event.target.options[event.target.selectedIndex].text }));
    };

    const nmblocation = async e => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://localhost:8889/location/locations', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(response.data)
            setFormData(response.data);
            navigate(-1)
        } catch (error) {
            console.error('Error saving location:', error);
        }
    };

    const handleGetCurrentPosition = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                setMapPosition([latitude, longitude]);
                setFormData(prev => ({ ...prev, latitude: latitude.toString(), longitude: longitude.toString() }));
            }, (error) => {
                console.error('Error getting geolocation:', error);
            });
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    const MapComponent = () => {
        const map = useMap();

        useEffect(() => {
            if (mapPosition.length > 0) {
                map.setView(mapPosition, 13);
            }
        }, [map, mapPosition]);

        return null;
    };
    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <form onSubmit={nmblocation} className="space-y-4">
                <div className="flex flex-col">
                    <label className="mb-2 font-semibold">Province: </label>
                    <select onChange={handleProvinceChange} value={selectedProvince || ''} className="p-2 border border-gray-300 rounded-md">
                        <option value="">เลือกจังหวัด</option>
                        {provinces.map(province => (
                            <option key={province.id} value={province.id}>{province.name_th}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label className="mb-2 font-semibold">Amphure: </label>
                    <select onChange={handleAmphureChange} value={selectedAmphure || ''} disabled={!selectedProvince} className="p-2 border border-gray-300 rounded-md">
                        <option value="">เลือกอำเภอ</option>
                        {amphures.map(amphure => (
                            <option key={amphure.id} value={amphure.id}>{amphure.name_th}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label className="mb-2 font-semibold">District: </label>
                    <select onChange={handleDistrictChange} value={selectedDistrict || ''} disabled={!selectedAmphure} className="p-2 border border-gray-300 rounded-md">
                        <option value="">เลือกตำบล</option>
                        {districts
                            .filter(district => district.amphure_id === selectedAmphure)
                            .map(district => (
                                <option key={district.id} value={district.id}>{district.name_th}</option>
                            ))
                        }
                    </select>
                </div>
                {['zip_code', 'road', 'village', 'house_number', 'other', 'latitude', 'longitude'].map((field, index) => (
                    <div className="flex flex-col" key={index}>
                        <label htmlFor={field} className="mb-2 font-semibold">{field === 'zip_code' ? 'รหัสไปรษณีย์' : field === 'road' ? 'ถนน' : field === 'village' ? 'หมู่บ้านที่' : field === 'house_number' ? 'บ้านเลขที่' : field === 'other' ? 'และอื่นๆ' : field.charAt(0).toUpperCase() + field.slice(1)}</label>
                        <input
                            type="text"
                            name={field}
                            value={formData[field]}
                            onChange={hdlChange}
                            placeholder={field.toUpperCase()}
                            className="p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                ))}
                <div className="flex flex-col">
                    <label htmlFor="userId" className="mb-2 font-semibold">เลขชื่อ</label>
                    <input
                        type="text"
                        name='userId'
                        value={formData.userId = user.id}
                        onChange={hdlChange}
                        placeholder="OTHER"
                        className="p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="flex space-x-4">
                    <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">บันทึก</button>
                    <button type="button" onClick={handleGetCurrentPosition} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">เปิดตำแหน่งในเครื่อง</button>
                </div>
            </form>
            <MapContainer center={mapPosition.length ? mapPosition : [13.7563, 100.5018]} zoom={10} style={{ height: '400px', width: '100%' }} className="mt-4 rounded-lg overflow-hidden">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {mapPosition.length > 0 && (
                    <>
                        <Marker position={mapPosition}>
                            <Popup>
                                Latitude: {mapPosition[0]}, Longitude: {mapPosition[1]}
                            </Popup>
                        </Marker>
                        <MapComponent />
                    </>
                )}
            </MapContainer>
        </div>
    );
};

export default Address;

