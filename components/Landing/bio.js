const Bio = (props) => {
	return (
		<section className="bio">
			<div className="bio__wrapper">
				<div className="bio--img">
					<img
						src="portrait.png"
						alt="Tina Alexander & her husband, Christian"
					/>
				</div>
				<div className="bio--descr">
					<h1 className="bio--title">meet your dietitian</h1>
                    <h2 className="bio--subtitle">tina alexander</h2>
					<div className="bio--par">
						<p>
							Hi there, I am a Registered Dietitian who is
							passionate about integrating nutrition with fitness
							and lifestyle to assist individuals in achieving
							optimal health. My passion roots from a family
							history of diabetes and heart disease, which has
							driven me to become a Certified Diabetes Care and
							Education Specialist and obtain my Certificate in
							Obesity and Weight Management.
						</p>
						<p>
							With my own struggles with weight due to Polycystic
							Ovarian Syndrome (PCOS), I am very compassionate and
							understanding with my client’s needs and struggles.
							I have worked with clients that have a variety of
							health concerns including diabetes, heart disease,
							obesity, Liver and Kidney diseases, emotional
							eating, eating disorders, dysphagia and tube
							feeding, nutritional decline in underweight
							individuals and much more. Take a glimpse at the
							services that Red Mountain Nutrition offers and do
							not hesitate to get in touch with me if you have any
							questions!
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Bio;
