from flask import Flask,Blueprint,request,flash,render_template,request,send_from_directory,jsonify
from app.models import Product,Hardware,Display,Battery,Camera,Connectivity,Extrainfo,Software
from app import db
import os
import uuid
from werkzeug.utils import secure_filename

addproduct = Blueprint('addproduct',__name__)
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')

@addproduct.route('/add_product',methods =['GET','POST'])
def add():
    if request.method == 'POST':
        name = request.form['name']
        description = request.form['description']
        price = request.form['price']
        stock = request.form['stock']
        category = request.form['category']
        file = request.files['file']
        brand = request.form.get('brand')
        releasedate = request.form.get('releasedate')
        availability = request.form.get('availability') == 'on'

        file_extension = file.filename.rsplit('.',1)[1].lower()
        unique_extension = generate_unique_filename(file_extension)
        filename = os.path.join(UPLOAD_FOLDER,unique_extension)
        file.save(filename)

        product = Product(
            name=name, 
            description=description,
            price=price,
            stock=stock,
            category=category,
            image=filename,
            brand=brand,
            releasedate=releasedate,
            availabity=availability
        )
        db.session.add(product)
        db.session.commit()

        chipset = request.form['chipset']
        ram = request.form['ram']
        storage = request.form['storage']
        storage_type = request.form['storage_type']
        gpu = request.form['gpu']
        build_material = request.form['build_material']
        weight = request.form['weight']
        
        hardware = Hardware(
            device_id=product.id,  
            chipset=chipset,
            ram=ram,
            storage=storage,
            storage_type=storage_type,
            gpu=gpu,
            build_material=build_material,
            weight=weight
        )

        
        screen_size = request.form['screen_size']
        screen_type = request.form['screen_type']
        resolution = request.form['resolution']
        refresh_rate = request.form['refresh_rate']
        touchscreen = request.form['touchscreen'] == 'on'

        display = Display(
            device_id=product.id,  
            screen_size=screen_size,
            screen_type=screen_type,
            resolution=resolution,
            refresh_rate=refresh_rate,
            touchscreen=touchscreen
        )

        
        battery_capacity = request.form['battery_capacity']
        battery_type = request.form['battery_type']
        charging_speed = request.form['charging_speed']
        battery_life = request.form['battery_life']

        battery = Battery(
            device_id=product.id,  
            battery_capacity=battery_capacity,
            battery_type=battery_type,
            charging_speed=charging_speed,
            battery_life=battery_life
        )

        rear_camera = request.form['rear_camera']
        front_camera = request.form['front_camera']
        video_recording = request.form['video_recording']
        sensors = request.form['sensors']
        extra = request.form['extra']
        camera = Camera(
            device_id=product.id,  
            rear_camera=rear_camera,
            front_camera=front_camera,
            video_recording=video_recording,
            sensors=sensors,
            extra=extra
        )

        charging_port_type = request.form['charging_port_type']
        headphone_jack = request.form['headphone_jack']
        hdmi_ports = request.form['hdmi_ports']
        wifi_specs = request.form['wifi_specs']
        bluetooth_specs = request.form['bluetooth_specs']
        cellular_specs = request.form['cellular_specs']
        sim_type = request.form['sim_type']
        nfc = request.form['nfc']
        gps = request.form['gps']

        connectivity = Connectivity(
            device_id=product.id,  
            charging_port_type=charging_port_type,
            headphone_jack=headphone_jack,
            hdmi_ports=hdmi_ports,
            wifi_specs=wifi_specs,
            bluetooth_specs=bluetooth_specs,
            cellular_specs=cellular_specs,
            sim_type=sim_type,
            nfc=nfc,
            gps=gps
        )

        biometrics = request.form['biometrics']
        stylus_support = request.form['stylus_support']
        keyboard = request.form['keyboard']
        water_resistant = request.form['water_resistant']
        speaker = request.form['speaker']
        microphone = request.form['microphone']

        extrainfo = Extrainfo(
            device_id=product.id,  
            biometrics=biometrics,
            stylus_support=stylus_support,
            keyboard=keyboard,
            water_resistant=water_resistant,
            speaker=speaker,
            microphone=microphone
        )

        operating_system = request.form['operating_system']
        os_version = request.form['os_version']
        extra_features = request.form['extra_features']
        promised_updates = request.form['promised_updates']
        software = Software(
            device_id=product.id,  
            operating_system=operating_system,
            os_version=os_version,
            extra_features=extra_features,
            promised_updates=promised_updates
        )

        
        
    
    

    try:
        db.session.add(hardware)
        db.session.add(display)   
        db.session.add(battery)   
        db.session.add(camera)    
        db.session.add(connectivity)  
        db.session.add(extrainfo)     
        db.session.add(software)   
        print("here")   
        db.session.commit()
        flash("sucess! succefully added")
        return "successfully added"
    except:
        return "There was an error while adding the product"

@addproduct.route('/add_product_html')
def add_product_html():
    return render_template('add_product.html')


def generate_unique_filename(extension):
    while True:
        unique_filename = str(uuid.uuid4()) + '.' + extension
        filepath = os.path.join(UPLOAD_FOLDER, unique_filename)
        if not os.path.exists(filepath):
            return unique_filename

@addproduct.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)
