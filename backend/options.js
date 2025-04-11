module.exports = {
  filters: {
    "Electronics & Gadgets": [
      {
        label: "Brand",
        options: ["Apple", "Samsung", "Google", "Sony", "LG", "ASUS"],
        type: "checkbox", // multiple selection (checkboxes)
      },
      {
        label: "Warranty",
        options: ["1 Year", "2 Years", "3 Years", "No Warranty"],
        type: "radio", // single selection (radio buttons)
      },
      {
        label: "Battery Life",
        options: [
          "Up to 10 Hours",
          "Up to 20 Hours",
          "Up to 30 Hours",
          "More than 30 Hours",
        ],
        type: "radio", // single selection (radio buttons)
      },
      {
        label: "Processor",
        options: ["Intel", "AMD", "Apple M1", "Qualcomm", "Exynos"],
        type: "dropdown", // dropdown (single selection)
      },
      {
        label: "Storage",
        options: ["16GB", "32GB", "64GB", "128GB", "256GB", "512GB"],
        type: "dropdown", // dropdown (single selection)
      },
      {
        label: "Price Range",
        options: [],
        type: "range", // price range (range slider)
      },
    ],

    "Clothing & Apparel": [
      {
        label: "Brand",
        options: ["Nike", "Adidas", "Puma", "Reebok", "Others"],
      },
      { label: "Size", options: ["XS", "S", "M", "L", "XL", "XXL"] },
      {
        label: "Material",
        options: [
          "Cotton",
          "Polyester",
          "Wool",
          "Denim",
          "Synthetic",
          "Leather",
        ],
      },
      { label: "Gender", options: ["Men", "Women", "Unisex"] },
      {
        label: "Occasion",
        options: ["Casual", "Formal", "Party", "Wedding", "Sports", "Outdoor"],
      },
    ],
    Footwear: [
      {
        label: "Brand",
        options: ["Nike", "Adidas", "Reebok", "Puma", "Under Armour"],
      },
      { label: "Size", options: ["6", "7", "8", "9", "10", "11", "12", "13"] },
      { label: "Sole Material", options: ["Rubber", "EVA", "PU", "Leather"] },
      {
        label: "Type",
        options: [
          "Sneakers",
          "Boots",
          "Flats",
          "Sandals",
          "Loafers",
          "Formal Shoes",
        ],
      },
      {
        label: "Color",
        options: ["Black", "White", "Brown", "Blue", "Red", "Grey"],
      },
    ],
    "Beauty & Personal Care": [
      {
        label: "Brand",
        options: [
          "Maybelline",
          "Lakme",
          "Ponds",
          "Nivea",
          "Dove",
          "The Body Shop",
        ],
      },
      {
        label: "Skin Type",
        options: ["Oily", "Dry", "Combination", "Sensitive", "Normal"],
      },
      {
        label: "Ingredients",
        options: [
          "Natural",
          "Paraben-Free",
          "Alcohol-Free",
          "Vegan",
          "Cruelty-Free",
        ],
      },
      {
        label: "Expiration Date",
        options: ["1 Year", "2 Years", "3 Years", "No Expiration"],
      },
      {
        label: "Type",
        options: ["Skincare", "Haircare", "Makeup", "Fragrances", "Wellness"],
      },
    ],
    "Home & Kitchen": [
      {
        label: "Brand",
        options: ["AmazonBasics", "Havells", "Philips", "Samsung", "Bajaj"],
      },
      { label: "Dimensions", options: ["Small", "Medium", "Large"] },
      { label: "Weight", options: ["Lightweight", "Medium", "Heavy"] },
      {
        label: "Material",
        options: ["Plastic", "Metal", "Wood", "Ceramic", "Glass"],
      },
      {
        label: "Type",
        options: [
          "Furniture",
          "Appliances",
          "Decor",
          "Kitchenware",
          "Bed and Bath",
        ],
      },
      {
        label: "Color",
        options: ["White", "Black", "Gray", "Wood", "Multicolor"],
      },
    ],
    "Books & Stationery": [
      {
        label: "Author",
        options: [
          "J.K. Rowling",
          "George R.R. Martin",
          "J.R.R. Tolkien",
          "Agatha Christie",
          "Others",
        ],
      },
      {
        label: "Publisher",
        options: [
          "Penguin",
          "HarperCollins",
          "Random House",
          "Oxford University Press",
        ],
      },
      { label: "Pages", options: ["<100", "100-200", "200-400", "400+"] },
      {
        label: "Genre",
        options: ["Fiction", "Non-Fiction", "Science", "History", "Fantasy"],
      },
      {
        label: "Language",
        options: ["English", "Spanish", "French", "German", "Others"],
      },
    ],
    "Grocery & Food": [
      {
        label: "Expiration Date",
        options: ["Fresh", "1 Week", "2 Weeks", "1 Month", "More than 1 Month"],
      },
      { label: "Weight", options: ["<1kg", "1-5kg", "5-10kg", "10kg+"] },
      {
        label: "Ingredients",
        options: ["Organic", "Gluten-Free", "Non-GMO", "Vegan", "Dairy-Free"],
      },
      {
        label: "Type",
        options: ["Fresh Produce", "Packaged", "Frozen", "Snacks", "Beverages"],
      },
    ],
    "Sports & Fitness": [
      {
        label: "Brand",
        options: ["Nike", "Adidas", "Reebok", "Puma", "Under Armour"],
      },
      {
        label: "Sport Type",
        options: ["Running", "Cycling", "Swimming", "Football", "Tennis"],
      },
      { label: "Weight", options: ["Lightweight", "Medium", "Heavy"] },
      { label: "Material", options: ["Rubber", "Metal", "Wood", "Synthetic"] },
    ],
    "Toys & Baby Products": [
      {
        label: "Age Range",
        options: [
          "0-6 Months",
          "6-12 Months",
          "1-3 Years",
          "4-7 Years",
          "7+ Years",
        ],
      },
      {
        label: "Safety Standards",
        options: ["CPSIA Certified", "ASTM Certified", "CE Certified"],
      },
      {
        label: "Material",
        options: ["Plastic", "Wood", "Fabric", "Metal", "Rubber"],
      },
      {
        label: "Type",
        options: ["Toys", "Clothing", "Baby Gear", "Feeding", "Health"],
      },
    ],
    "Automotive & Accessories": [
      {
        label: "Vehicle Type",
        options: ["Car", "Motorcycle", "Truck", "SUV", "Van"],
      },
      { label: "Compatibility", options: ["Universal", "Brand-Specific"] },
      {
        label: "Warranty",
        options: ["1 Year", "2 Years", "3 Years", "No Warranty"],
      },
      {
        label: "Type",
        options: [
          "Car Accessories",
          "Motorcycle Accessories",
          "Maintenance Products",
        ],
      },
    ],
    "Jewelry & Watches": [
      {
        label: "Material",
        options: ["Gold", "Silver", "Platinum", "Leather", "Stainless Steel"],
      },
      {
        label: "Gemstone",
        options: ["Diamond", "Ruby", "Emerald", "Sapphire", "None"],
      },
      {
        label: "Water Resistance",
        options: ["Water-Resistant", "Waterproof", "Not Water-Resistant"],
      },
      {
        label: "Type",
        options: ["Necklaces", "Earrings", "Bracelets", "Watches", "Rings"],
      },
    ],
    "Healthcare & Wellness": [
      {
        label: "Expiration Date",
        options: ["1 Year", "2 Years", "3 Years", "No Expiration"],
      },
      {
        label: "Benefits",
        options: [
          "Immunity Boost",
          "Energy Boost",
          "Relaxation",
          "Skin Health",
        ],
      },
      { label: "Usage", options: ["Daily", "Occasional", "As Needed"] },
      {
        label: "Type",
        options: ["Vitamins", "Supplements", "Essential Oils", "Herbal"],
      },
    ],
  },
  categoryOptions: {
    categories: [
      {
        name: "Electronics & Gadgets",
        fields: ["warranty", "batteryLife", "processor"],
      },
      { name: "Clothing & Apparel", fields: ["size", "material", "gender"] },
      { name: "Footwear", fields: ["size", "soleMaterial", "type"] },
      {
        name: "Beauty & Personal Care",
        fields: ["skinType", "ingredients", "expirationDate"],
      },
      { name: "Home & Kitchen", fields: ["dimensions", "weight", "material"] },
      { name: "Books & Stationery", fields: ["author", "publisher", "pages"] },
      {
        name: "Grocery & Food",
        fields: ["expirationDate", "weight", "ingredients"],
      },
      { name: "Sports & Fitness", fields: ["sportType", "weight", "material"] },
      {
        name: "Toys & Baby Products",
        fields: ["ageRange", "safetyStandards", "material"],
      },
      {
        name: "Automotive & Accessories",
        fields: ["vehicleType", "compatibility", "warranty"],
      },
      {
        name: "Jewelry & Watches",
        fields: ["material", "gemstone", "waterResistance"],
      },
      {
        name: "Healthcare & Wellness",
        fields: ["expirationDate", "benefits", "usage"],
      },
    ],
    categorySelectOptions: {
      color: ["Red", "Blue", "Green", "Black", "White"],
      gender: ["Male", "Female", "Unisex"],
      type: ["Sneakers", "Boots", "Sandals"],
      sportType: ["Running", "Cycling", "Swimming"],
      vehicleType: ["Car", "Motorcycle", "Truck"],
      size: ["XS", "S", "M", "L", "XL", "XXL"],
      isReturnable: ["Yes", "No"],
    },
    categoryFieldTypes: {
      size: "checkbox",
      material: "text",
      warranty: "number",
      brand: "text",
      color: "select",
      availability: "radio",
      isReturnable: "checkbox",
      batteryLife: "text",
      processor: "text",
      gender: "select",
      soleMaterial: "text",
      type: "select",
      skinType: "text",
      ingredients: "text",
      expirationDate: "date",
      dimensions: "text",
      weight: "number",
      author: "text",
      publisher: "text",
      pages: "number",
      sportType: "select",
      ageRange: "text",
      safetyStandards: "text",
      vehicleType: "select",
      compatibility: "text",
      gemstone: "text",
      waterResistance: "text",
      benefits: "text",
      usage: "text",
    },
    fieldTypes: {
      size: "checkbox",
      material: "text",
      warranty: "number",
      brand: "text",
      color: "select",
      availability: "radio",
      isReturnable: "checkbox",
      batteryLife: "text",
      processor: "text",
      gender: "select",
      soleMaterial: "text",
      type: "select",
      skinType: "text",
      ingredients: "text",
      expirationDate: "date",
      dimensions: "text",
      weight: "number",
      author: "text",
      publisher: "text",
      pages: "number",
      sportType: "select",
      ageRange: "text",
      safetyStandards: "text",
      vehicleType: "select",
      compatibility: "text",
      gemstone: "text",
      waterResistance: "text",
      benefits: "text",
      usage: "text",
    },
  },
};
