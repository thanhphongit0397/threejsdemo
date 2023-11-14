import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const BuildingModel = () => {
    const containerRef = useRef();

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();

        // Kích thước của tòa nhà
        const buildingWidth = 5;
        const buildingHeight = 1.5;
        const buildingDepth = 8;

        // Tạo hình hộp chữ nhật cho mặt trước
        const frontGeometry = new THREE.BoxGeometry(buildingWidth, buildingHeight, 0.01);
        const frontMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Màu đỏ
        const frontCube = new THREE.Mesh(frontGeometry, frontMaterial);
        frontCube.position.set(0, 0, buildingDepth / 2);

        // Tạo hình hộp chữ nhật cho mặt sau
        const backGeometry = new THREE.BoxGeometry(buildingWidth, buildingHeight, 0.01);
        const backMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Màu xanh lá cây
        const backCube = new THREE.Mesh(backGeometry, backMaterial);
        backCube.position.set(0, 0, -buildingDepth / 2);

        // Tạo hình hộp chữ nhật cho mặt trái
        const leftGeometry = new THREE.BoxGeometry(0.01, buildingHeight, buildingDepth);
        const leftMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // Màu vàng
        const leftCube = new THREE.Mesh(leftGeometry, leftMaterial);
        leftCube.position.set(-buildingWidth / 2, 0, 0);

        // Tạo hình hộp chữ nhật cho mặt phải
        const rightGeometry = new THREE.BoxGeometry(0.01, buildingHeight, buildingDepth);
        const rightMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff }); // Màu xanh dương
        const rightCube = new THREE.Mesh(rightGeometry, rightMaterial);
        rightCube.position.set(buildingWidth / 2, 0, 0);

        // Tạo hình hộp chữ nhật cho mặt nền
        const groundGeometry = new THREE.BoxGeometry(buildingWidth, 0.01, buildingDepth);
        const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 }); // Màu xám
        const groundCube = new THREE.Mesh(groundGeometry, groundMaterial);
        groundCube.position.set(0, -buildingHeight / 2, 0);

        // Nhóm tất cả các hình hộp vào một nhóm
        const group = new THREE.Group();
        group.add(frontCube);
        group.add(backCube);
        group.add(leftCube);
        group.add(rightCube);
        group.add(groundCube);

        // Di chuyển nhóm đến trung tâm
        group.position.set(0, 4, 0);

        scene.add(group);

        // Thiết lập camera và renderer
        camera.position.set(4, 10, 0); // Đặt camera ở trên cùng của tòa nhà
        camera.lookAt(new THREE.Vector3(0, 0, 0)); // Nhìn xuống trung tâm của tòa nhà
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Thêm renderer vào DOM
        containerRef.current.appendChild(renderer.domElement);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            // Rotate group
            group.rotation.y += 0.005;

            // Render scene
            renderer.render(scene, camera);
        };

        // Gọi hàm animate để bắt đầu vòng lặp
        animate();

        // Xử lý sự kiện resize
        const handleResize = () => {
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;

            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(newWidth, newHeight);
        };

        window.addEventListener('resize', handleResize);

        // Clean up
        return () => {
            window.removeEventListener('resize', handleResize);
            containerRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={containerRef} />;
};

export default BuildingModel;
