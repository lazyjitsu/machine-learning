ML with JS and No libraries!
We suposely learned that normalization is very sensitive to outlier points! One way to deal with this is to automatically detect the outlier and remove it. Another way is standardization, a different data scaling technique!

For standardization, we simply calculate the mean and standard deviation. Then we subtract the data point from the mean and divide by the standard deviation:

$$ standardizedPoint = {x - mean\over \sigma} $$

Standardization is less sensitive to outliers and would work better in our case. 

A generalization of the nearest neighbor classifier is the **K Nearest Neighbors**
