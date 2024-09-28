-- Ivan Romero
-- assignment 2 queries

-- 1 Adding tony stark to the admin table

INSERT INTO public.account
(
account_firstname, account_lastname, account_email,account_password
)
VALUES
(
'Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n'
);

-- 2 Updating the account type of Tony Stark
UPDATE public.account SET account_type = 'Admin' WHERE account_id = 1;

-- 3 removing Ironman :(
DELETE from public.account WHERE account_id = 1;

-- 4 replacing the small interiors to huge interiors in the Hummer
UPDATE public.inventory
SET inv_description = REPLACE(inv_description, 'small interiors','a huge interior')
WHERE inv_id = 10;

-- 5 make and model from inventory & classification from classification
SELECT inv_make, inv_model, classification_name
FROM public.inventory
INNER JOIN public.classification
ON public.inventory.classification_id = public.classification.classification_id
WHERE classification_name = 'Sport';


-- 6 changing the path for image and the thumbnail for the inventory vehicles
UPDATE public.inventory
SET
inv_image = REPLACE(inv_image,'/images','/images/vehicles'),
inv_thumbnail = REPLACE(inv_thumbnail,'/images','/images/vehicles');