import { Box, Grid, Typography, Paper, Avatar } from "@mui/material";
import { Spa, CardGiftcard, LocalShipping, Palette } from "@mui/icons-material";

const advantages = [
	{
		icon: <Spa fontSize="large" color="primary" />,
		text: "פירות טריים מהשוק",
		description:
			"אנו בוחרים בקפידה את הפירות הטריים והאיכותיים ביותר מדי יום.",
	},
	{
		icon: <CardGiftcard fontSize="large" color="primary" />,
		text: "התאמה לאירועים",
		description:
			"מגשים מותאמים אישית לכל סוגי האירועים: חגים, ימי הולדת, ועוד.",
	},
	{
		icon: <LocalShipping fontSize="large" color="primary" />,
		text: "משלוחים בשומרון",
		description: "שירות משלוחים מהיר ואמין לכל אזור השומרון והסביבה.",
	},
	{
		icon: <Palette fontSize="large" color="primary" />,
		text: "עיצוב ייחודי לכל לקוח",
		description:
			"כל מגש מעוצב באהבה ותשומת לב, ליצירת חוויה ויזואלית מרשימה.",
	},
];

export default function AdvantagesSection() {
	return (
		<Box
			component="section"
			sx={{
				py: 4,
				bgcolor: "background.paper",
				borderRadius: 2,
				my: 4,
			}}
		>
			<Box sx={{ textAlign: "center", mb: 4 }}>
				<Typography
					variant="h4"
					color="primary"
					gutterBottom
				>
					יתרונות שלנו
				</Typography>
			</Box>
			<Grid container spacing={4}>
				{advantages.map((adv, idx) => (
					<Grid
						key={idx}
						size={{ xs: 12, sm: 6, md: 3 }}
						display="flex"
						justifyContent="center"
					>
						<Paper
							elevation={3}
							sx={{
								p: 3,
								textAlign: "center",
								borderRadius: 2,
							}}
						>
							<Avatar
								sx={{
									bgcolor: "primary.main",
									mx: "auto",
									mb: 2,
								}}
							>
								{adv.icon}
							</Avatar>
							<Typography
								variant="h6"
								color="primary"
								gutterBottom
							>
								{adv.text}
							</Typography>
							<Typography
								variant="body2"
								color="textSecondary"
							>
								{adv.description}
							</Typography>
						</Paper>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}
