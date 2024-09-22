import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CustomCard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="grid grid-cols-2 gap-6">
            {/* Card 1 - Дополнительный учитель */}
            <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <img
                        src="https://space.marsit.uz/img/tutor-img.34ff9406.png" // Placeholder image
                        alt="Дополнительный учитель"
                        className="w-12 h-12"
                    />
                    <div>
                        <p className="font-bold text-gray-700">Дополнительный учитель</p>
                        <p className="text-gray-500">Запишитесь на дополнительный урок</p>
                    </div>
                </div>
                <button className="bg-blue-500 text-white w-[120px] h-[30px] rounded-lg">
                    Записаться
                </button>
            </div>

            {/* Card 2 - Новости */}
            <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <img
                        src="https://space.marsit.uz/img/news.bb559cba.svg" // Placeholder image
                        alt="Новости"
                        className="w-12 h-12"
                    />
                    <div>
                        <p className=" font-bold text-gray-700">Новости</p>
                        <p className=" text-gray-500">Будьте в курсе последних новостей</p>
                    </div>
                </div>
                <Link
                to="/news"
                    className="bg-red-500 text-center text-white w-[120px] h-[30px] rounded-lg"
                >
                    Watch
                </Link>
                {isModalOpen && (
                    <dialog open className="modal">
                        <div className="modal-box">
                            <button
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                onClick={closeModal}
                            >
                                ✕
                            </button>
                            <h3 className="text-lg">Новости</h3>
                            <p className="py-4">Here you can find the latest news from our learning center.</p>
                        </div>
                    </dialog>
                )}
            </div>

            {/* Card 3 - Сертификаты */}
            <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <img
                        src="https://space.marsit.uz/img/certificate.137f8907.svg" // Placeholder image
                        alt="Сертификаты"
                        className="w-12 h-12"
                    />
                    <div>
                        <p className="  text-gray-700">Сертификаты</p>
                        <p className=" text-gray-500">Сертификаты, выданные Mars IT School</p>
                    </div>
                </div>
                <button className="bg-blue-200 text-blue-500 w-[120px] h-[30px] rounded-lg">
                    Check
                </button>
            </div>

            {/* Card 4 - Поделиться с друзьями */}
            <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <img
                        src="https://space.marsit.uz/img/share-icon-left.c27c8ca7.svg" // Placeholder image
                        alt="Поделиться с друзьями"
                        className="w-12 h-12"
                    />
                    <div>
                        <p className=" text-gray-700">Поделиться с друзьями</p>
                        <p className="text-gray-500">Делитесь с друзьями и получайте коины</p>
                    </div>
                </div>
                <button className="bg-blue-200 text-blue-500 w-[120px] h-[30px] rounded-lg">
                    Share
                </button>
            </div>
        </div>
    );
};

export default CustomCard;
