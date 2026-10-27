const form = document.querySelector('#calc-form');

const totalPrice = document.querySelector('#total-price');
const sumArea = document.querySelector('#sum-area');
const sumMaterials = document.querySelector('#sum-materials');
const sumServices = document.querySelector('#sum-services');

const formatMoney = (amount) => {
    return '$' + new Intl.NumberFormat('en-US').format(amount);
};

const submitBtn = document.querySelector('#submit-btn');

let currentData = {
    area: 0,
    renovationType: '',
    propertyType: '',
    materialLevel: '',
    serviceElectrical: false,
    servicePlumbing: false,
    serviceDebris: false,
    total: 0
};

function calculate() {
    const formData = new FormData(form);

    const area = Number(formData.get('area'));
    const renovationType = formData.get('renovation-type');
    const propertyType = formData.get('property-type');
    const materialLevel = formData.get('material-level');

    const serviceElectrical = formData.get('service-electrical');
    const servicePlumbing = formData.get('service-plumbing');
    const serviceDebris = formData.get('service-debris');


    currentData.area = area;
    currentData.renovationType = renovationType;
    currentData.propertyType = propertyType;
    currentData.materialLevel = materialLevel;

    currentData.serviceElectrical = !!serviceElectrical;
    currentData.servicePlumbing = !!servicePlumbing;
    currentData.serviceDebris = !!serviceDebris;


    let areaCost = area * 500;

    if (renovationType === 'capital') {
        areaCost = area * 500 * 1.5;
    } 
    if (renovationType === 'designer') {
        areaCost = area * 500 * 2.5;
    }
    if (propertyType === 'secondary') {
        areaCost = areaCost * 1.1;
    }

    let materialCost = 0;

    if (materialLevel === 'premium') {
        materialCost = areaCost * 0.3;
    }

    let servicesCost = 0;

    if (serviceElectrical) {
        servicesCost += 1500;
    }
    if (servicePlumbing) {
        servicesCost += 1200;
    }
    if (serviceDebris) {
        servicesCost += 500;
    }


    const total = areaCost + materialCost + servicesCost;

    currentData.total = total;

    totalPrice.textContent = formatMoney(total);
    sumArea.textContent = formatMoney(areaCost);
    sumMaterials.textContent = formatMoney(materialCost);
    sumServices.textContent = formatMoney(servicesCost);

}


submitBtn.addEventListener('click', function(event) {
    event.preventDefault();

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    const payload = new FormData();
    
    payload.append('_subject', 'New Estimate Request from Calculator');
    
    payload.append('Area (m2)', currentData.area);
    payload.append('Renovation Type', currentData.renovationType);
    payload.append('Property Type', currentData.propertyType);
    payload.append('Material Level', currentData.materialLevel);
    payload.append('Electrical', currentData.serviceElectrical);
    payload.append('Plumbing', currentData.servicePlumbing);
    payload.append('Debris Removal', currentData.serviceDebris);
    payload.append('Total Price', totalPrice.textContent);

    const formspreeUrl = 'https://formspree.io/f/xdeazkbz';

    fetch(formspreeUrl, {
        method: 'POST',
        body: payload,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            submitBtn.textContent = 'Request Sent! ✓';
            
            form.reset();
            calculate();
        
            setTimeout(() => {
                submitBtn.textContent = 'Get exact estimate';
                submitBtn.disabled = false;
            }, 3000);
        } else {
            throw new Error('Error');
        }
    })
    .catch(() => {
        submitBtn.textContent = 'Error. Try again.';
        submitBtn.disabled = false;
        setTimeout(() => { submitBtn.textContent = 'Get exact estimate'; }, 3000);
    });
});

form.addEventListener('input', calculate);
form.addEventListener('change', calculate);

calculate();






















