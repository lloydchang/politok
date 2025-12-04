import { STATE_LOCATIONS } from './policyData.js';

// Real verified accounts for specific cities/mayors
const REAL_ACCOUNTS = {
    // Mayors & Personalities
    'New York City, New York': { username: '@ericadamsfornyc', displayName: 'Mayor Eric Adams', type: 'mayor' },
    'Los Angeles, California': { username: '@karenbassla', displayName: 'Mayor Karen Bass', type: 'mayor' },
    'Chicago, Illinois': { username: '@chicagosmayor', displayName: 'Mayor Brandon Johnson', type: 'mayor' },
    'Oneonta, Alabama': { username: '@mayorshenanigans', displayName: 'Mayor Richard Phillips', type: 'mayor' },
    'Gambier, Ohio': { username: '@leemankessler', displayName: 'Mayor Leeman Kessler', type: 'mayor' },

    // Official City Accounts
    'Seattle, Washington': { username: '@cityofseattle', displayName: 'City of Seattle', type: 'city' },
    'Miami, Florida': { username: '@cityofmiami', displayName: 'City of Miami', type: 'city' },
    'Las Vegas, Nevada': { username: '@cityoflasvegas', displayName: 'City of Las Vegas', type: 'city' },
    'Tampa, Florida': { username: '@cityoftampa', displayName: 'City of Tampa', type: 'city' },
    'Minneapolis, Minnesota': { username: '@cityofminneapolis', displayName: 'City of Minneapolis', type: 'city' },
    'Boston, Massachusetts': { username: '@cityofboston', displayName: 'City of Boston', type: 'city' },
    'Philadelphia, Pennsylvania': { username: '@cityofphiladelphia', displayName: 'City of Philadelphia', type: 'city' },
    'Houston, Texas': { username: '@cityofhouston', displayName: 'City of Houston', type: 'city' },
    'Phoenix, Arizona': { username: '@cityofphoenixaz', displayName: 'City of Phoenix', type: 'city' },
    'San Diego, California': { username: '@cityofsandiego', displayName: 'City of San Diego', type: 'city' },
    'Dallas, Texas': { username: '@cityofdallas', displayName: 'City of Dallas', type: 'city' },
    'San Jose, California': { username: '@cityofsanjose', displayName: 'City of San Jose', type: 'city' },
    'Austin, Texas': { username: '@austintexasgov', displayName: 'City of Austin', type: 'city' },
    'Jacksonville, Florida': { username: '@cityofjax', displayName: 'City of Jacksonville', type: 'city' },
    'Fort Worth, Texas': { username: '@cityoffortworth', displayName: 'City of Fort Worth', type: 'city' },
    'Columbus, Ohio': { username: '@cityofcolumbus', displayName: 'City of Columbus', type: 'city' },
    'Indianapolis, Indiana': { username: '@cityofindianapolis', displayName: 'City of Indianapolis', type: 'city' },
    'Charlotte, North Carolina': { username: '@cltgov', displayName: 'City of Charlotte', type: 'city' },
    'San Francisco, California': { username: '@sf_travel', displayName: 'San Francisco', type: 'city' },
    'Denver, Colorado': { username: '@cityofdenver', displayName: 'City of Denver', type: 'city' },
    'Washington, District of Columbia': { username: '@mayorbowser', displayName: 'Mayor Muriel Bowser', type: 'mayor' },
    'Nashville, Tennessee': { username: '@visitmusiccity', displayName: 'Nashville', type: 'city' },
    'Oklahoma City, Oklahoma': { username: '@cityofokc', displayName: 'City of OKC', type: 'city' },
    'El Paso, Texas': { username: '@cityofelpaso', displayName: 'City of El Paso', type: 'city' },
    'Portland, Oregon': { username: '@cityofportland', displayName: 'City of Portland', type: 'city' },
    'Memphis, Tennessee': { username: '@cityofmemphis', displayName: 'City of Memphis', type: 'city' },
    'Detroit, Michigan': { username: '@cityofdetroit', displayName: 'City of Detroit', type: 'city' },
    'Baltimore, Maryland': { username: '@baltimorecity', displayName: 'City of Baltimore', type: 'city' },
    'Milwaukee, Wisconsin': { username: '@cityofmilwaukee', displayName: 'City of Milwaukee', type: 'city' },
    'Albuquerque, New Mexico': { username: '@cityofcabq', displayName: 'City of Albuquerque', type: 'city' },
    'Tucson, Arizona': { username: '@cityoftucson', displayName: 'City of Tucson', type: 'city' },
    'Fresno, California': { username: '@cityoffresno', displayName: 'City of Fresno', type: 'city' },
    'Sacramento, California': { username: '@cityofsacramento', displayName: 'City of Sacramento', type: 'city' },
    'Kansas City, Missouri': { username: '@kansascity', displayName: 'Kansas City', type: 'city' },
    'Mesa, Arizona': { username: '@cityofmesa', displayName: 'City of Mesa', type: 'city' },
    'Atlanta, Georgia': { username: '@cityofatlanta', displayName: 'City of Atlanta', type: 'city' },
    'Omaha, Nebraska': { username: '@cityofomaha', displayName: 'City of Omaha', type: 'city' },
    'Colorado Springs, Colorado': { username: '@cityofcos', displayName: 'City of Colorado Springs', type: 'city' },
    'Raleigh, North Carolina': { username: '@cityofraleigh', displayName: 'City of Raleigh', type: 'city' },
    'Long Beach, California': { username: '@longbeachcity', displayName: 'City of Long Beach', type: 'city' },
    'Virginia Beach, Virginia': { username: '@cityofvabeach', displayName: 'City of Virginia Beach', type: 'city' },
    'Oakland, California': { username: '@oakland', displayName: 'City of Oakland', type: 'city' },
    'Minneapolis, Minnesota': { username: '@cityofminneapolis', displayName: 'City of Minneapolis', type: 'city' },
    'Tulsa, Oklahoma': { username: '@cityoftulsa', displayName: 'City of Tulsa', type: 'city' },
    'Arlington, Texas': { username: '@cityofarlington', displayName: 'City of Arlington', type: 'city' },
    'New Orleans, Louisiana': { username: '@mayorcantrell', displayName: 'Mayor LaToya Cantrell', type: 'mayor' },
    'Wichita, Kansas': { username: '@cityofwichita', displayName: 'City of Wichita', type: 'city' },
    'Cleveland, Ohio': { username: '@cityofcleveland', displayName: 'City of Cleveland', type: 'city' },
    'Bakersfield, California': { username: '@cityofbakersfield', displayName: 'City of Bakersfield', type: 'city' },
    'Tampa, Florida': { username: '@cityoftampa', displayName: 'City of Tampa', type: 'city' },
    'Aurora, Colorado': { username: '@cityofauroraco', displayName: 'City of Aurora', type: 'city' },
    'Anaheim, California': { username: '@cityofanaheim', displayName: 'City of Anaheim', type: 'city' },
    'Honolulu, Hawaii': { username: '@honolulugov', displayName: 'City of Honolulu', type: 'city' },
    'Santa Ana, California': { username: '@cityofsantaana', displayName: 'City of Santa Ana', type: 'city' },
    'Riverside, California': { username: '@cityofriverside', displayName: 'City of Riverside', type: 'city' },
    'Corpus Christi, Texas': { username: '@cityofcc', displayName: 'City of Corpus Christi', type: 'city' },
    'Lexington, Kentucky': { username: '@lexingtonkygov', displayName: 'Lexington', type: 'city' },
    'Stockton, California': { username: '@cityofstockton', displayName: 'City of Stockton', type: 'city' },
    'St. Paul, Minnesota': { username: '@cityofstpaul', displayName: 'City of St. Paul', type: 'city' },
    'Cincinnati, Ohio': { username: '@cityofcincy', displayName: 'City of Cincinnati', type: 'city' },
    'Henderson, Nevada': { username: '@cityofhenderson', displayName: 'City of Henderson', type: 'city' },
    'Greensboro, North Carolina': { username: '@cityofgreensboro', displayName: 'City of Greensboro', type: 'city' },
    'Plano, Texas': { username: '@cityofplano', displayName: 'City of Plano', type: 'city' },
    'Newark, New Jersey': { username: '@cityofnewarknj', displayName: 'City of Newark', type: 'city' },
    'Lincoln, Nebraska': { username: '@cityoflincoln', displayName: 'City of Lincoln', type: 'city' },
    'Toledo, Ohio': { username: '@cityoftoledo', displayName: 'City of Toledo', type: 'city' },
    'Orlando, Florida': { username: '@thecitybeautiful', displayName: 'City of Orlando', type: 'city' },
    'Chula Vista, California': { username: '@thinkchulavista', displayName: 'City of Chula Vista', type: 'city' },
    'Irvine, California': { username: '@cityofirvine', displayName: 'City of Irvine', type: 'city' },
    'Fort Wayne, Indiana': { username: '@cityoffortwayne', displayName: 'City of Fort Wayne', type: 'city' },
    'Jersey City, New Jersey': { username: '@jerseycity', displayName: 'Jersey City', type: 'city' },
    'Durham, North Carolina': { username: '@cityofdurhamnc', displayName: 'City of Durham', type: 'city' },
    'St. Petersburg, Florida': { username: '@stpete', displayName: 'St. Pete', type: 'city' },
    'Laredo, Texas': { username: '@cityoflaredo', displayName: 'City of Laredo', type: 'city' },
    'Buffalo, New York': { username: '@cityofbuffalo', displayName: 'City of Buffalo', type: 'city' },
    'Madison, Wisconsin': { username: '@cityofmadison', displayName: 'City of Madison', type: 'city' },
    'Lubbock, Texas': { username: '@cityoflubbock', displayName: 'City of Lubbock', type: 'city' },
    'Chandler, Arizona': { username: '@cityofchandler', displayName: 'City of Chandler', type: 'city' },
    'Scottsdale, Arizona': { username: '@cityofscottsdale', displayName: 'City of Scottsdale', type: 'city' },
    'Glendale, Arizona': { username: '@glendaleaz', displayName: 'City of Glendale', type: 'city' },
    'Reno, Nevada': { username: '@cityofreno', displayName: 'City of Reno', type: 'city' },
    'Norfolk, Virginia': { username: '@cityofnorfolkva', displayName: 'City of Norfolk', type: 'city' },
    'Gilbert, Arizona': { username: '@gilbertaz', displayName: 'Gilbert', type: 'city' },
    'Winston-Salem, North Carolina': { username: '@cityofwinstonsalem', displayName: 'City of Winston-Salem', type: 'city' },
    'North Las Vegas, Nevada': { username: '@cityofnlv', displayName: 'City of North Las Vegas', type: 'city' },
    'Irving, Texas': { username: '@thecityofirving', displayName: 'City of Irving', type: 'city' },
    'Chesapeake, Virginia': { username: '@cityofchesapeake', displayName: 'City of Chesapeake', type: 'city' },
    'Garland, Texas': { username: '@garlandtxgov', displayName: 'City of Garland', type: 'city' },
    'Hialeah, Florida': { username: '@cityofhialeah', displayName: 'City of Hialeah', type: 'city' },
    'Fremont, California': { username: '@cityoffremont', displayName: 'City of Fremont', type: 'city' },
    'Boise, Idaho': { username: '@cityofboise', displayName: 'City of Boise', type: 'city' },
    'Richmond, Virginia': { username: '@cityofrichmond', displayName: 'City of Richmond', type: 'city' },
    'Baton Rouge, Louisiana': { username: '@cityofbatonrouge', displayName: 'City of Baton Rouge', type: 'city' },
    'Spokane, Washington': { username: '@cityofspokane', displayName: 'City of Spokane', type: 'city' },
    'Des Moines, Iowa': { username: '@cityofdesmoines', displayName: 'City of Des Moines', type: 'city' },
    'Tacoma, Washington': { username: '@cityoftacoma', displayName: 'City of Tacoma', type: 'city' },
    'San Bernardino, California': { username: '@sbcitygov', displayName: 'City of San Bernardino', type: 'city' },
    'Modesto, California': { username: '@cityofmodesto', displayName: 'City of Modesto', type: 'city' },
    'Fontana, California': { username: '@cityoffontana', displayName: 'City of Fontana', type: 'city' },
    'Santa Clarita, California': { username: '@santaclarita', displayName: 'City of Santa Clarita', type: 'city' },
    'Birmingham, Alabama': { username: '@cityofbirmingham', displayName: 'City of Birmingham', type: 'city' },
    'Oxnard, California': { username: '@cityofoxnard', displayName: 'City of Oxnard', type: 'city' },
    'Fayetteville, North Carolina': { username: '@cityoffayetteville', displayName: 'City of Fayetteville', type: 'city' },
    'Moreno Valley, California': { username: '@cityofmoval', displayName: 'City of Moreno Valley', type: 'city' },
    'Rochester, New York': { username: '@cityofrochester', displayName: 'City of Rochester', type: 'city' },
    'Glendale, California': { username: '@myglendale', displayName: 'City of Glendale', type: 'city' },
    'Huntington Beach, California': { username: '@cityofhuntingtonbeach', displayName: 'City of Huntington Beach', type: 'city' },
    'Salt Lake City, Utah': { username: '@slcgov', displayName: 'Salt Lake City', type: 'city' },
    'Grand Rapids, Michigan': { username: '@cityofgrandrapids', displayName: 'City of Grand Rapids', type: 'city' },
    'Amarillo, Texas': { username: '@cityofamarillo', displayName: 'City of Amarillo', type: 'city' },
    'Yonkers, New York': { username: '@cityofyonkers', displayName: 'City of Yonkers', type: 'city' },
    'Aurora, Illinois': { username: '@cityofaurorail', displayName: 'City of Aurora', type: 'city' },
    'Montgomery, Alabama': { username: '@cityofmontgomery', displayName: 'City of Montgomery', type: 'city' },
    'Akron, Ohio': { username: '@cityofakron', displayName: 'City of Akron', type: 'city' },
    'Little Rock, Arkansas': { username: '@cityoflittlerock', displayName: 'City of Little Rock', type: 'city' },
    'Huntsville, Alabama': { username: '@huntsvillecity', displayName: 'City of Huntsville', type: 'city' },
    'Augusta, Georgia': { username: '@augustagov', displayName: 'Augusta', type: 'city' },
    'Port St. Lucie, Florida': { username: '@cityofpsl', displayName: 'City of Port St. Lucie', type: 'city' },
    'Grand Prairie, Texas': { username: '@cityofgptx', displayName: 'City of Grand Prairie', type: 'city' },
    'Columbus, Georgia': { username: '@columbusgagov', displayName: 'Columbus', type: 'city' },
    'Tallahassee, Florida': { username: '@cityoftlh', displayName: 'City of Tallahassee', type: 'city' },
    'Overland Park, Kansas': { username: '@cityofop', displayName: 'City of Overland Park', type: 'city' },
    'Tempe, Arizona': { username: '@tempegov', displayName: 'City of Tempe', type: 'city' },
    'McKinney, Texas': { username: '@cityofmckinney', displayName: 'City of McKinney', type: 'city' },
    'Mobile, Alabama': { username: '@cityofmobile', displayName: 'City of Mobile', type: 'city' },
    'Cape Coral, Florida': { username: '@capecoral', displayName: 'City of Cape Coral', type: 'city' },
    'Shreveport, Louisiana': { username: '@cityofshreveport', displayName: 'City of Shreveport', type: 'city' },
    'Frisco, Texas': { username: '@cityoffrisco', displayName: 'City of Frisco', type: 'city' },
    'Knoxville, Tennessee': { username: '@cityofknoxville', displayName: 'City of Knoxville', type: 'city' },
    'Worcester, Massachusetts': { username: '@cityofworcester', displayName: 'City of Worcester', type: 'city' },
    'Brownsville, Texas': { username: '@btxgov', displayName: 'City of Brownsville', type: 'city' },
    'Vancouver, Washington': { username: '@vancouverus', displayName: 'City of Vancouver', type: 'city' },
    'Fort Lauderdale, Florida': { username: '@cityoffortlauderdale', displayName: 'City of Fort Lauderdale', type: 'city' },
    'Sioux Falls, South Dakota': { username: '@cityofsiouxfalls', displayName: 'City of Sioux Falls', type: 'city' },
    'Ontario, California': { username: '@cityofontario', displayName: 'City of Ontario', type: 'city' },
    'Chattanooga, Tennessee': { username: '@chattanoogagov', displayName: 'City of Chattanooga', type: 'city' },
    'Providence, Rhode Island': { username: '@cityofprovidence', displayName: 'City of Providence', type: 'city' },
    'Newport News, Virginia': { username: '@cityofnn', displayName: 'City of Newport News', type: 'city' },
    'Rancho Cucamonga, California': { username: '@cityofrc', displayName: 'City of Rancho Cucamonga', type: 'city' },
    'Santa Rosa, California': { username: '@cityofsantarosa', displayName: 'City of Santa Rosa', type: 'city' },
    'Peoria, Arizona': { username: '@peoriaaz', displayName: 'City of Peoria', type: 'city' },
    'Oceanside, California': { username: '@cityofoceanside', displayName: 'City of Oceanside', type: 'city' },
    'Elk Grove, California': { username: '@elkgrovecity', displayName: 'City of Elk Grove', type: 'city' },
    'Salem, Oregon': { username: '@cityofsalem', displayName: 'City of Salem', type: 'city' },
    'Pembroke Pines, Florida': { username: '@cityofppines', displayName: 'City of Pembroke Pines', type: 'city' },
    'Eugene, Oregon': { username: '@cityofeugene', displayName: 'City of Eugene', type: 'city' },
    'Garden Grove, California': { username: '@gardengrovecityhall', displayName: 'City of Garden Grove', type: 'city' },
    'Cary, North Carolina': { username: '@townofcary', displayName: 'Town of Cary', type: 'city' },
    'Fort Collins, Colorado': { username: '@fortcollinsgov', displayName: 'City of Fort Collins', type: 'city' },
    'Corona, California': { username: '@cityofcorona', displayName: 'City of Corona', type: 'city' },
    'Springfield, Missouri': { username: '@cityofsgf', displayName: 'City of Springfield', type: 'city' },
    'Jackson, Mississippi': { username: '@cityofjackson', displayName: 'City of Jackson', type: 'city' },
    'Alexandria, Virginia': { username: '@alexandriavagov', displayName: 'City of Alexandria', type: 'city' },
    'Hayward, California': { username: '@cityofhayward', displayName: 'City of Hayward', type: 'city' },
    'Lancaster, California': { username: '@cityoflancaster', displayName: 'City of Lancaster', type: 'city' },
    'Lakewood, Colorado': { username: '@lakewoodcolo', displayName: 'City of Lakewood', type: 'city' },
    'Clarksville, Tennessee': { username: '@cityofclarksville', displayName: 'City of Clarksville', type: 'city' },
    'Palmdale, California': { username: '@cityofpalmdale', displayName: 'City of Palmdale', type: 'city' },
    'Salinas, California': { username: '@cityofsalinas', displayName: 'City of Salinas', type: 'city' },
    'Springfield, Massachusetts': { username: '@cityofspringfieldma', displayName: 'City of Springfield', type: 'city' },
    'Hollywood, Florida': { username: '@cityofhollywoodfl', displayName: 'City of Hollywood', type: 'city' },
    'Pasadena, Texas': { username: '@pasadenatx', displayName: 'City of Pasadena', type: 'city' },
    'Sunnyvale, California': { username: '@cityofsunnyvale', displayName: 'City of Sunnyvale', type: 'city' },
    'Macon, Georgia': { username: '@maconbibb', displayName: 'Macon-Bibb County', type: 'city' },
    'Kansas City, Kansas': { username: '@kckgovernment', displayName: 'Unified Gov KCK', type: 'city' },
    'Pomona, California': { username: '@cityofpomona', displayName: 'City of Pomona', type: 'city' },
    'Escondido, California': { username: '@cityofescondido', displayName: 'City of Escondido', type: 'city' },
    'Killeen, Texas': { username: '@cityofkilleen', displayName: 'City of Killeen', type: 'city' },
    'Naperville, Illinois': { username: '@naper_ville', displayName: 'City of Naperville', type: 'city' },
    'Joliet, Illinois': { username: '@cityofjoliet', displayName: 'City of Joliet', type: 'city' },
    'Bellevue, Washington': { username: '@cityofbellevue', displayName: 'City of Bellevue', type: 'city' },
    'Rockford, Illinois': { username: '@cityofrockford', displayName: 'City of Rockford', type: 'city' },
    'Savannah, Georgia': { username: '@cityofsavannah', displayName: 'City of Savannah', type: 'city' },
    'Paterson, New Jersey': { username: '@cityofpaterson', displayName: 'City of Paterson', type: 'city' },
    'Torrance, California': { username: '@cityoftorranceca', displayName: 'City of Torrance', type: 'city' },
    'Bridgeport, Connecticut': { username: '@cityofbridgeport', displayName: 'City of Bridgeport', type: 'city' },
    'McAllen, Texas': { username: '@cityofmcallen', displayName: 'City of McAllen', type: 'city' },
    'Mesquite, Texas': { username: '@cityofmesquite', displayName: 'City of Mesquite', type: 'city' },
    'Syracuse, New York': { username: '@syracuse1848', displayName: 'City of Syracuse', type: 'city' },
    'Midland, Texas': { username: '@cityofmidland', displayName: 'City of Midland', type: 'city' },
    'Pasadena, California': { username: '@cityofpasadena', displayName: 'City of Pasadena', type: 'city' },
    'Murfreesboro, Tennessee': { username: '@cityofmurfreesboro', displayName: 'City of Murfreesboro', type: 'city' },
    'Miramar, Florida': { username: '@cityofmiramar', displayName: 'City of Miramar', type: 'city' },
    'Denton, Texas': { username: '@cityofdenton', displayName: 'City of Denton', type: 'city' },
    'West Covina, California': { username: '@westcovinacity', displayName: 'City of West Covina', type: 'city' },
    'Roseville, California': { username: '@cityofroseville', displayName: 'City of Roseville', type: 'city' },
    'Olathe, Kansas': { username: '@cityofolathe', displayName: 'City of Olathe', type: 'city' },
    'Surprise, Arizona': { username: '@cityofsurprise', displayName: 'City of Surprise', type: 'city' },
    'Waco, Texas': { username: '@cityofwaco', displayName: 'City of Waco', type: 'city' },
    'Carrollton, Texas': { username: '@cityofcarrollton', displayName: 'City of Carrollton', type: 'city' },
    'West Valley City, Utah': { username: '@wvcgov', displayName: 'West Valley City', type: 'city' },
    'Orange, California': { username: '@cityoforange', displayName: 'City of Orange', type: 'city' },
    'Fullerton, California': { username: '@cityoffullerton', displayName: 'City of Fullerton', type: 'city' },
    'Charleston, South Carolina': { username: '@cityofcharleston', displayName: 'City of Charleston', type: 'city' },
    'Warren, Michigan': { username: '@cityofwarren', displayName: 'City of Warren', type: 'city' },
    'Hampton, Virginia': { username: '@cityofhampton', displayName: 'City of Hampton', type: 'city' },
    'Gainesville, Florida': { username: '@cityofgainesville', displayName: 'City of Gainesville', type: 'city' },
    'Visalia, California': { username: '@cityofvisalia', displayName: 'City of Visalia', type: 'city' },
    'Coral Springs, Florida': { username: '@coralspringsfl', displayName: 'City of Coral Springs', type: 'city' },
    'Columbia, South Carolina': { username: '@cityofcolumbia', displayName: 'City of Columbia', type: 'city' },
    'Cedar Rapids, Iowa': { username: '@cityofcr', displayName: 'City of Cedar Rapids', type: 'city' },
    'Sterling Heights, Michigan': { username: '@sterlingheights', displayName: 'City of Sterling Heights', type: 'city' },
    'New Haven, Connecticut': { username: '@cityofnewhaven', displayName: 'City of New Haven', type: 'city' },
    'Stamford, Connecticut': { username: '@cityofstamford', displayName: 'City of Stamford', type: 'city' },
    'Concord, California': { username: '@cityofconcord', displayName: 'City of Concord', type: 'city' },
    'Elizabeth, New Jersey': { username: '@cityofelizabeth', displayName: 'City of Elizabeth', type: 'city' },
    'Thousand Oaks, California': { username: '@cityofto', displayName: 'City of Thousand Oaks', type: 'city' },
    'Kent, Washington': { username: '@cityofkent', displayName: 'City of Kent', type: 'city' },
    'Simi Valley, California': { username: '@cityofsimivalley', displayName: 'City of Simi Valley', type: 'city' },
    'Lafayette, Louisiana': { username: '@lafayettela', displayName: 'Lafayette', type: 'city' },
    'Topeka, Kansas': { username: '@cityoftopeka', displayName: 'City of Topeka', type: 'city' },
    'Athens, Georgia': { username: '@accgov', displayName: 'Athens-Clarke County', type: 'city' },
    'Hartford, Connecticut': { username: '@cityofhartford', displayName: 'City of Hartford', type: 'city' },
    'Victorville, California': { username: '@cityofvictorville', displayName: 'City of Victorville', type: 'city' },
    'Abilene, Texas': { username: '@cityofabilene', displayName: 'City of Abilene', type: 'city' },
    'Norman, Oklahoma': { username: '@cityofnorman', displayName: 'City of Norman', type: 'city' },
    'Vallejo, California': { username: '@cityofvallejo', displayName: 'City of Vallejo', type: 'city' },
    'Berkeley, California': { username: '@cityofberkeley', displayName: 'City of Berkeley', type: 'city' },
    'Round Rock, Texas': { username: '@cityofroundrock', displayName: 'City of Round Rock', type: 'city' },
    'Ann Arbor, Michigan': { username: '@a2gov', displayName: 'City of Ann Arbor', type: 'city' },
    'Fargo, North Dakota': { username: '@cityoffargo', displayName: 'City of Fargo', type: 'city' },
    'Columbia, Missouri': { username: '@cityofcolumbia', displayName: 'City of Columbia', type: 'city' },
    'Allentown, Pennsylvania': { username: '@cityofallentown', displayName: 'City of Allentown', type: 'city' },
    'Evansville, Indiana': { username: '@cityofevansville', displayName: 'City of Evansville', type: 'city' },
    'Beaumont, Texas': { username: '@cityofbeaumont', displayName: 'City of Beaumont', type: 'city' },
    'Odessa, Texas': { username: '@cityofodessa', displayName: 'City of Odessa', type: 'city' },
    'Wilmington, North Carolina': { username: '@cityofwilmington', displayName: 'City of Wilmington', type: 'city' },
    'Arvada, Colorado': { username: '@cityofarvada', displayName: 'City of Arvada', type: 'city' },
    'Independence, Missouri': { username: '@cityofindependence', displayName: 'City of Independence', type: 'city' },
    'Provo, Utah': { username: '@provocity', displayName: 'City of Provo', type: 'city' },
    'Lansing, Michigan': { username: '@cityoflansing', displayName: 'City of Lansing', type: 'city' },
    'El Monte, California': { username: '@cityofelmonte', displayName: 'City of El Monte', type: 'city' },
    'Springfield, Illinois': { username: '@cityofspringfield', displayName: 'City of Springfield', type: 'city' },
    'Fairfield, California': { username: '@cityoffairfield', displayName: 'City of Fairfield', type: 'city' },
    'Clearwater, Florida': { username: '@cityofclearwater', displayName: 'City of Clearwater', type: 'city' },
    'Peoria, Illinois': { username: '@cityofpeoria_il', displayName: 'City of Peoria', type: 'city' },
    'Rochester, Minnesota': { username: '@cityofrochestermn', displayName: 'City of Rochester', type: 'city' },
    'Carlsbad, California': { username: '@carlsbadcagov', displayName: 'City of Carlsbad', type: 'city' },
    'Westminster, Colorado': { username: '@cityofwestminster', displayName: 'City of Westminster', type: 'city' },
    'Miami Gardens, Florida': { username: '@cityofmiamigardens', displayName: 'City of Miami Gardens', type: 'city' },
    'Temecula, California': { username: '@cityoftemecula', displayName: 'City of Temecula', type: 'city' },
    'Costa Mesa, California': { username: '@cityofcostamesa', displayName: 'City of Costa Mesa', type: 'city' },
    'High Point, North Carolina': { username: '@cityofhighpoint', displayName: 'City of High Point', type: 'city' },
    'Manchester, New Hampshire': { username: '@manchesternh', displayName: 'City of Manchester', type: 'city' },
    'Pueblo, Colorado': { username: '@cityofpueblo', displayName: 'City of Pueblo', type: 'city' },
    'Gresham, Oregon': { username: '@cityofgresham', displayName: 'City of Gresham', type: 'city' },
    'North Charleston, South Carolina': { username: '@northcharleston', displayName: 'North Charleston', type: 'city' },
    'Ventura, California': { username: '@cityofventura', displayName: 'City of Ventura', type: 'city' },
    'Inglewood, California': { username: '@cityofinglewood', displayName: 'City of Inglewood', type: 'city' },
    'Centennial, Colorado': { username: '@centennialgov', displayName: 'City of Centennial', type: 'city' },
    'West Jordan, Utah': { username: '@westjordancity', displayName: 'City of West Jordan', type: 'city' },
    'Everett, Washington': { username: '@everettcity', displayName: 'City of Everett', type: 'city' },
    'Richmond, California': { username: '@cityofrichmondca', displayName: 'City of Richmond', type: 'city' },
    'Clovis, California': { username: '@cityofclovis', displayName: 'City of Clovis', type: 'city' },
    'Billings, Montana': { username: '@cityofbillings', displayName: 'City of Billings', type: 'city' },
    'Jurupa Valley, California': { username: '@jurupavalley', displayName: 'City of Jurupa Valley', type: 'city' },
    'West Palm Beach, Florida': { username: '@westpalmbeach', displayName: 'City of West Palm Beach', type: 'city' },
    'Broken Arrow, Oklahoma': { username: '@cityofba', displayName: 'City of Broken Arrow', type: 'city' },
    'Sandy Springs, Georgia': { username: '@sandysprings', displayName: 'City of Sandy Springs', type: 'city' },
    'Daly City, California': { username: '@dalycitygov', displayName: 'City of Daly City', type: 'city' },
    'Hillsboro, Oregon': { username: '@cityofhillsboro', displayName: 'City of Hillsboro', type: 'city' },
    'Green Bay, Wisconsin': { username: '@cityofgreenbay', displayName: 'City of Green Bay', type: 'city' },
    'Tyler, Texas': { username: '@cityoftyler', displayName: 'City of Tyler', type: 'city' },
    'Wichita Falls, Texas': { username: '@cityofwichitafalls', displayName: 'City of Wichita Falls', type: 'city' },
    'Lewisville, Texas': { username: '@cityoflewisville', displayName: 'City of Lewisville', type: 'city' },
    'Burbank, California': { username: '@burbankca', displayName: 'City of Burbank', type: 'city' },
    'Greeley, Colorado': { username: '@cityofgreeley', displayName: 'City of Greeley', type: 'city' },
    'San Mateo, California': { username: '@cityofsanmateo', displayName: 'City of San Mateo', type: 'city' },
    'El Cajon, California': { username: '@cityofelcajon', displayName: 'City of El Cajon', type: 'city' },
    'Renton, Washington': { username: '@cityofrenton', displayName: 'City of Renton', type: 'city' },
    'Davenport, Iowa': { username: '@cityofdavenport', displayName: 'City of Davenport', type: 'city' },
    'South Bend, Indiana': { username: '@cityofsouthbend', displayName: 'City of South Bend', type: 'city' },
    'Vista, California': { username: '@cityofvista', displayName: 'City of Vista', type: 'city' },
    'Tuscaloosa, Alabama': { username: '@tuscaloosacity', displayName: 'City of Tuscaloosa', type: 'city' },
    'Clinton, Michigan': { username: '@clintontownship', displayName: 'Clinton Township', type: 'city' },
    'Edison, New Jersey': { username: '@edisonnj', displayName: 'Edison Township', type: 'city' },
    'Woodbridge, New Jersey': { username: '@woodbridgenj', displayName: 'Woodbridge Township', type: 'city' },
    'San Angelo, Texas': { username: '@cityofsanangelo', displayName: 'City of San Angelo', type: 'city' },
    'Kenosha, Wisconsin': { username: '@cityofkenosha', displayName: 'City of Kenosha', type: 'city' },
    'Rialto, California': { username: '@cityofrialto', displayName: 'City of Rialto', type: 'city' },
};

/**
 * Generate a consistent profile picture URL for a location
 * @param {string} name - Name to display (e.g. "City of Seattle")
 * @returns {string} URL to avatar image
 */
function getProfilePic(name) {
    // Use ui-avatars.com for consistent, nice looking placeholders
    // Background color is random based on name to keep it consistent for same name
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=200&font-size=0.5&length=2`;
}

/**
 * Get all TikTok accounts for all locations
 * @returns {Array} Array of all account objects
 */
export const TIKTOK_ACCOUNTS = (() => {
    const accounts = [];
    const processedLocations = new Set();

    // 1. Add all REAL_ACCOUNTS first
    Object.entries(REAL_ACCOUNTS).forEach(([location, account]) => {
        accounts.push({
            ...account,
            location,
            profilePic: getProfilePic(account.displayName),
            isReal: true
        });
        processedLocations.add(location);
    });

    // 2. Generate accounts for all other locations in STATE_LOCATIONS
    Object.entries(STATE_LOCATIONS).forEach(([state, cities]) => {
        cities.forEach(city => {
            const fullLocation = `${city}, ${state}`;

            // Skip if we already have a real account for this location
            if (processedLocations.has(fullLocation)) return;

            // Generate a plausible account
            // Format: @cityof[cityname] (lowercase, no spaces)
            const cleanCity = city.toLowerCase().replace(/[^a-z0-9]/g, '');
            const username = `@cityof${cleanCity}`;
            const displayName = `City of ${city}`;

            accounts.push({
                username,
                displayName,
                location: fullLocation,
                type: 'city',
                profilePic: getProfilePic(displayName),
                isReal: false // Generated
            });

            processedLocations.add(fullLocation);
        });
    });

    return accounts;
})();

/**
 * Get TikTok accounts for a specific location
 * @param {string} locationName - City or state name
 * @param {string} stateName - State name
 * @returns {Array} Array of TikTok accounts for the location
 */
export function getTikTokAccountsForLocation(locationName, stateName) {
    // Filter accounts that match the location
    // Note: locationName passed in might be "City, State" or just "City"
    // The accounts array has "City, State" in location field

    return TIKTOK_ACCOUNTS.filter(acc => {
        if (acc.location === locationName) return true;
        if (acc.location.includes(locationName)) return true;
        return false;
    });
}

/**
 * Get total count of followed TikTok accounts
 * @returns {number} Count of accounts
 */
export function getFollowingCount() {
    return TIKTOK_ACCOUNTS.length;
}
