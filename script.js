const form = document.querySelector('#calc-form');

const totalPrice = document.querySelector('#total-price');
const sumArea = document.querySelector('#sum-area');
const sumMaterials = document.querySelector('#sum-materials');
const sumServices = document.querySelector('#sum-services');

const formatMoney = (amount) => {
    return '$' + new Intl.NumberFormat('en-US').format(amount);
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

    totalPrice.textContent = formatMoney(total);
    sumArea.textContent = formatMoney(areaCost);
    sumMaterials.textContent = formatMoney(materialCost);
    sumServices.textContent = formatMoney(servicesCost);


}

form.addEventListener('input', calculate);
form.addEventListener('change', calculate);

calculate();






















