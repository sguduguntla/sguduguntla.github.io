.. bldg_point_clustering documentation master file, created by
   sphinx-quickstart on Wed Dec  4 16:50:14 2019.

Welcome to bldg_point_clustering's documentation!
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Introduction
============

A Python 3.5+ wrapper for clustering building point labels
using KMeans, DBScan, and Agglomerative clustering.

Installation
============

Using pip for Python 3.5+ run:

.. code-block:: console

   $ pip install bldg_point_clustering

Quick Start
===========

Instantiate Featurizer object and get featurized Pandas DataFrame.

Instantiate Cluster object and pass in featurized
DataFrame to. Then, call a clustering method with the
appropriate parameters.

Use the plot3D function in the Plotter to create a
3D plot of metrics returned by any of the clustering trials.

Featurizer
==========
.. autoclass:: featurizer.featurizer.Featurizer
   :members:
   :undoc-members:

Cluster
=======
.. autoclass:: cluster.cluster.Cluster
   :members:
   :undoc-members:

Plotter
=======
.. automodule:: plotter.plotter
   :members:
   :undoc-members:

Metrics
=======
.. automodule:: metrics.metrics
   :members:
   :undoc-members:

Index
=====

* :ref:`genindex`
* :ref:`search`
* :ref:`modindex`

.. toctree::
   :maxdepth: 2
   :caption: Contents:

