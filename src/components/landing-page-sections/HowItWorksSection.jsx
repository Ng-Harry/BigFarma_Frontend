function WorkCard({ title, description, image, bgColor, iconBgColor, textColor = "text-white", descriptionColor }) {
  const getBgColorStyle = (colorName) => {
    const colorMap = {
      'bg-primary': '#016130',
      'bg-secondary-dark': '#FFA725',
      'bg-primary-light': '#01AE56',
      'bg-primary-dark': '#382100'
    };
    
    return colorMap[colorName] || '';
  };
  
  return (
    <div 
      className={`${textColor} border-0 h-[180px] md:h-[306px] shadow-sm`}
      style={{ backgroundColor: getBgColorStyle(bgColor) }}
    >
      <div className="p-5 md:p-8 h-full flex flex-col justify-center">
        <div className={`items-center justify-center mb-4 pl-1`}>
          <img src={image} alt={title} className="w-12 h-12" />
        </div>
        <h3 className={`text-[21px] md:text-3xl font-semibold mb-2 ${descriptionColor}`}>{title}</h3>
        <p className={` text-sm md:text-md ${descriptionColor}`}>{description}</p>
      </div>
    </div>
  )
}

const workItems = [
  {
    title: "Marketplace",
    image: "/src/assets/icons/marketplace.svg",
    description: "Farmer list products, buyers order directly on the platform",
    bgColor: "bg-primary",
    iconBgColor: "bg-white",
    descriptionColor: "text-white",
  },
  {
    title: "Investment Hub",
    image: "/src/assets/icons/investment.svg",
    description: "Individuals invest in farms with transparency",
    bgColor: "bg-secondary-dark",
    iconBgColor: "bg-yellow-800",
    textColor: "text-secondary-dark",
    descriptionColor: "text-gray-800",
  },
  {
    title: "Logistics Integration",
    image: "/src/assets/icons/logistics.svg",
    description: "Enjoy reliable farm-to-door delivery",
    bgColor: "bg-primary-light",
    iconBgColor: "bg-white",
    descriptionColor: "text-white",
  },
  {
    title: "Insights & Alerts",
    image: "/src/assets/icons/insights.svg",
    description: "Stay ahead with weather, pest, and disease alerts",
    bgColor: "bg-primary-dark",
    iconBgColor: "bg-yellow-100",
    descriptionColor: "text-secondary-light",
  },
]

export default function HowItWorksSection() {
  return (
    <section className="pt-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[28px] md:text-5xl font-semibold text-center mb-5 lg:mb-8">How BigFarma Works</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {workItems.map((item, index) => (
            <WorkCard
              key={index}
              title={item.title}
              description={item.description}
              image={item.image}
              bgColor={item.bgColor}
              iconBgColor={item.iconBgColor}
              textColor={item.textColor}
              descriptionColor={item.descriptionColor}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
