export default function SectionHeader({subHeader, mainHeader}){
return(
  <>
  <h3 className="uppercase text-gray-500 font-semibold leading-4 mb-4">
          {subHeader}
        </h3>
        <h2 className="text-primary italic font-bold text-4xl ">{mainHeader}</h2>
      
  </>
)
}