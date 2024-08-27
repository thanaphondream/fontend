import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Already_Shipped = () => {
    const location = useLocation();
    const orderData = location.state?.orderData;
    console.log(orderData);
    const navigate = useNavigate()

    const totalPrice = orderData?.ordercart.reduce(
        (total, item) => total + item.menutems.price,
        0
    );

    // const allnumber = orderData.ordercart.reduce((total, item, index) => total + index, 1);
    const allnumber = orderData.ordercart.length;
    const latitude = orderData?.Payment[0]?.location.longitude
    const longitude = orderData?.Payment[0]?.location.latitude


    // console.log(allnumber);
    const paymentids = orderData.Payment[0].id
    const orderId = orderData.id
    console.log(orderId, 888)

    const Linkconfirm = () => {
        navigate('/')
    }

    return (
        <div className="flex items-center justify-center mt-10 w-[80rem]">
            {orderData ? (
                <div className="bg-white shadow-md rounded-lg p-8 w-full">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold">รายการจัดส่ง</h1>
                    </div>
                    <h2 className="text-lg font-semibold mb-4">ชื่อคุณ: {orderData?.Payment[0]?.user?.username}</h2>
                    <p className="mb-4">
                        <span className="font-semibold">Status:</span> {orderData.status}
                    </p>
                    <hr className="mb-6" />
                    {orderData.ordercart.map((m, index) => (
                        <div key={m.id} className="mb-6 p-4 bg-gray-100 rounded-lg shadow-sm">
                            <p className="font-semibold">รายการที่ {index + 1}</p>
                            <p>ชื่อ: {m.menutems.ItemName}</p>
                            <p>ราคา: {m.menutems.price} บาท</p>
                            <p>จำนวน: {m.total}</p>
                        </div>
                    ))}
                    <div className="text-center mt-6">
                        <p className="text-lg font-semibold mb-4">รูปภาพ</p>
                        <div className="flex flex-wrap content-center gap-10 justify-center">
                            {orderData.ordercart.map((img) => (
                                <div key={img.id} className="bg-white rounded-lg shadow-lg p-2">
                                    <img
                                        src={img.menutems.file}
                                        alt={img.menutems.ItemName}
                                        className="w-56 h-36 object-cover rounded-md"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="text-center mt-8">
                        <hr className="mb-6" />
                        <p className="text-xl font-bold">รายการรวม: {allnumber} รายการ</p>
                        <p className="text-xl font-bold mt-4">จำนวนรวม: {orderData.total_all} จำนวน</p>
                        <p className="text-xl font-bold mt-4">รวมราคาทั้งหมด: {totalPrice} บาท</p>
                    </div>
                    {/* Map Section */}
                    <div className="text-center mt-10">
                        <h3 className="text-xl font-semibold mb-4">สถานที่จัดส่ง</h3>
                        {orderData.Payment.map((m) => (
                    <div key={m.id} className="text-left mt-2 text-gray-700 text-center">
                        <p>
                                จังหวัด {m.location.provinces}, อำเภอ {m.location.amphures},{' '}
                                {m.location.districts}, ถนน {m.location.road}, หมู่บ้านที่{' '}
                                {m.location.village}, บ้านเลขที่ {m.location.house_number},{' '}
                                {m.location.other}
                            </p>
                        </div>
                    ))}
                    <br />
                    <br />
                    <div>
                        <p className='text-xl font-bold'>เบอร์โทร</p>
                        <p>{orderData?.Payment[0]?.user?.phon}</p>
                    </div>
                    <br />
                    <h1 className='text-xl font-bold'>แผ่นที่</h1>
                    <br />
                        <MapContainer
                            center={[latitude, longitude]}
                            zoom={13}
                            style={{ height: '400px', width: '100%' }}
                            className="rounded-lg shadow-lg"
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={[latitude, longitude]}>
                                <Popup>
                                    สถานที่จัดส่ง
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                    <div className='mt-28'>
                        <hr className="mb-6" />
                        <p className='text-xl font-bold text-center'>หลักฐานการเข้ารับ</p>
                        <div className='mb-6 p-4 bg-gray-50 rounded-lg shadow-sm mt-8'>
                            <p>ชื่อผู้รับ:  {orderData?.Payment[0]?.Delivery[0].name}</p>
                            <p>รายระเอียด:  {orderData?.Payment[0]?.Delivery[0].Note}</p>
                        </div>
                        <div>
                            <p className='text-xl font-bold text-center'>รูปภาพการเข้ารับ</p>
                            <img src={orderData?.Payment[0]?.Delivery[0].image} alt="" className='mt-8 w-[50%] h-[50%] mr-auto ml-auto'/>
                        </div>
                    </div>
                    <div className="text-center mt-10">
                        <hr className="mb-6" />
                        <button className="bg-cyan-500 text-white w-[25%] h-14 rounded-md shadow-lg hover:bg-cyan-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105" onClick={Linkconfirm}>
                            ไปหน้าหลัก
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-center text-lg">Loading order details...</p>
            )}
        </div>
    );
}


export default Already_Shipped